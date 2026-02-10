import Terminal, { Color } from '@utils/Terminal';

import Events from '@modules/handler/Events';
import Commands from '@modules/handler/Commands';

import { RegisteredCommand } from '@/utils/decorators/Command';

import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';

export class BotClient extends Client {
	commands = new Collection () as Collection<string, RegisteredCommand>;

	constructor () {
		super ({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
			],

			partials: [
				Partials.User,
				Partials.Channel,
				Partials.Message,
				Partials.GuildMember,
			],
		});
	}

	async start (token: string) {
		try {
			Terminal.log ('Loading all events...', Color.Blue);
			await Events (this);
			Terminal.log ('Events loaded successfully!', Color.Green, true);

			Terminal.log ('Loading all commands...', Color.Blue);
			await Commands (this);
			Terminal.log ('Commands loaded successfully!', Color.Green, true);

			await this.login (token);
		} catch (error: Error | unknown) {
			Terminal.log (`Failed to start the BOT: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
		}
	}
}