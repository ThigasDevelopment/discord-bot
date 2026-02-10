import { Event } from '@decorators/Event';
import { BotClient } from '@modules/discord/Client';

import Controllers from '@/modules/handler/Controller';

import { Events } from 'discord.js';

@Event ({ name: Events.ClientReady, once: true })
export default class Ready {
	async execute (client: BotClient) {
		await Controllers (client);
		console.log (`Logged in as ${ client.user?.tag }!`);
	}
}