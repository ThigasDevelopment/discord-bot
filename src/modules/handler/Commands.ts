import { pathToFileURL } from 'url';

import fg from 'fast-glob';
import path from 'path';

import { BotClient } from '@modules/discord/Client';
import { GlobalCommands } from '@/utils/decorators/Command';

async function Commands (client: BotClient) {
	const files = await fg ('src/modules/discord/commands/**/*.ts');

	for (const dir of files) {
		const file = path.resolve (dir);
		await import (pathToFileURL (file).href);
	}

	for (const command of GlobalCommands) {
		const data = command.data;
		if (!data) {
			continue;
		}

		client.commands.set (data.name, command);
	}
}

export default Commands;