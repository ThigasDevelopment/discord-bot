import { Event } from '@decorators/Event';
import { BotClient } from '@modules/discord/Client';

import { Events } from 'discord.js';

@Event ({ name: Events.ClientReady, once: true })
export default class Ready {
	async execute (client: BotClient) {
		console.log (`Logged in as ${ client.user?.tag }!`);
	}
}