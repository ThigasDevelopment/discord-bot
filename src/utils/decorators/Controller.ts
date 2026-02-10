import { BotClient } from '@/modules/discord/Client';

import { TextChannel } from 'discord.js';

import { BotInteraction } from '@utils/types/controller';

export interface ControllerData {
	id: string;
	name: string;
	channelId?: string;
};

export interface RegisteredController extends ControllerData {
	load?: (client: BotClient, channel: TextChannel) => any;
	exec: (interaction: BotInteraction, parsed?: Object) => any;
};

export const GlobalControllers: RegisteredController[ ] = [ ];

export function Controller (controller: ControllerData) {
	return function <T extends { new (...args: any[ ]): { } }> (constructor: T) {
		const instance = new constructor () as any;

		GlobalControllers.push ({
			id: controller.id,
			name: controller.name,
			channelId: controller.channelId,

			load: (client: BotClient, channel: TextChannel) => instance.load (client, channel),
			exec: (interaction: BotInteraction, parsed?: Object) => instance.exec (interaction, parsed),
		});

		return constructor;
	};
}