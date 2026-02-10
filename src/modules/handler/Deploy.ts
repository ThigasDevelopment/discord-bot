import 'dotenv/config';

import { REST, Routes } from 'discord.js';
import { pathToFileURL } from 'node:url';

import fg from 'fast-glob';
import path from 'node:path';

import { GlobalCommands } from '@/utils/decorators/Command';
import Terminal, { Color } from '@utils/Terminal';

async function Deploy (clientId: string, guildId: string) {
	console.clear ();

	if (!clientId) {
		return Terminal.log ('Client ID is required.', Color.Red, true);
	}

	if (!guildId) {
		return Terminal.log ('Guild ID is required.', Color.Red, true);
	}

	const files = await fg ('src/modules/discord/commands/**/*.ts');
	for (const dir of files) {
		const file = path.resolve (dir);
		await import (pathToFileURL (file).href);
	}

	const commands = GlobalCommands.map (command => command.data.toJSON ());
	const rest = new REST ({ version: '10' }).setToken (process.env.BOT_TOKEN);

	try {
		Terminal.log (`Started refreshing application (/) commands.`, Color.Blue, true);

		Terminal.log ('Removing existing commands...', Color.Yellow, true);
		await rest.put (Routes.applicationGuildCommands (clientId, guildId), { body: [ ] });

		Terminal.log ('Registering new commands...', Color.Blue, true);
		await rest.put (Routes.applicationGuildCommands (clientId, guildId), { body: commands });

		Terminal.log (`Successfully reloaded ${ commands.length } application (/) commands.`, Color.Green, true);
	} catch (error: Error | unknown) {
		Terminal.log (`Error while refreshing commands: ${ (error as Error).message }`, Color.Red, true);
	}
}

Deploy (process.argv[2], process.argv[3]);