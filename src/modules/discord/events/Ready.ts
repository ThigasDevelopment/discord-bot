import { Event } from '@decorators/Event';
import { BotClient } from '@modules/discord/Client';
import Terminal, { Color } from '@/utils/Terminal';

import Controllers from '@/modules/handler/Controller';

import { Events } from 'discord.js';

@Event ({ name: Events.ClientReady, once: true })
export default class Ready {
	async execute (client: BotClient) {
		Terminal.log ('Loading all controllers...', Color.Blue);
		try {
			await Controllers (client);
			Terminal.log ('Controllers loaded successfully!', Color.Green, true);
		} catch (error: Error | unknown) {
			Terminal.log (`Failed to load controllers: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
			return;
		}

		setTimeout (
			() => {
				console.clear ();

				Terminal.log ('BOT is running successfully!', Color.Green, true);
			}, 1000
		);
	}
}