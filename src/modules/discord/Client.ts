import { Client, GatewayIntentBits, Partials } from 'discord.js';

import Terminal, { Color } from '@utils/Terminal';

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
			await this.login (token);
			Terminal.log ('BOT is running successfully!', Color.Green);
		} catch (error: Error | unknown) {
			Terminal.log (`Failed to start the bot: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
		}
	}
}