import { TextChannel } from 'discord.js';

import { BotClient } from '@modules/discord/Client';
import { GlobalControllers } from '@/utils/decorators/Controller';

import { pathToFileURL } from 'node:url';

import fg from 'fast-glob';
import path from 'path';

async function Controllers (client: BotClient) {
	const files = await fg ('src/modules/discord/controllers/**/*.ts');

	for (const dir of files) {
		const file = path.resolve (dir);
		await import (pathToFileURL (file).href);
	}

	for (const controller of Object.values (GlobalControllers)) {
		const channelId = controller.channelId;
		if (channelId && typeof controller.load == 'function') {
			const channel = await client.channels.fetch (channelId).catch (() => null) as TextChannel;
			if (!channel) {
				continue
			}

			if (channel.isTextBased () && 'bulkDelete' in channel) {
				await channel.bulkDelete (100).catch (() => null);
				controller.load (client, channel);
			}
		}
	}
}

export default Controllers;
