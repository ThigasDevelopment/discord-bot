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
			await Events (this);
			await Commands (this);

			await this.login (token);
			Terminal.log ('BOT is running successfully!', Color.Green, true);
		} catch (error: Error | unknown) {
			Terminal.log (`Failed to start the BOT: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
		}
	}
}