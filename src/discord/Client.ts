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
}