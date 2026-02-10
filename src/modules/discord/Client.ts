import Terminal, { Color } from '@utils/Terminal';

import Events from '@modules/handler/Events';

import { Client, GatewayIntentBits, Partials } from 'discord.js';

export class BotClient extends Client {
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

			await this.login (token);
			Terminal.log ('BOT is running successfully!', Color.Green);
		} catch (error: Error | unknown) {
			Terminal.log (`Failed to start the bot: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
		}
	}
}