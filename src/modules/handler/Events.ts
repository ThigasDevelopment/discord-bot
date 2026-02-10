import { GlobalEvents } from '@decorators/Event';
import { BotClient } from '@modules/discord/Client';

import { pathToFileURL } from 'node:url';

import fg from 'fast-glob';
import path from 'node:path';

async function Events (client: BotClient) {
	const files = await fg ('src/modules/discord/events/**/*.ts');

	for (const dir of files) {
		const file = path.resolve (dir);
		await import (pathToFileURL (file).href);
	}

	for (const { name, once, execute } of GlobalEvents) {
		if (once) {
			client.once (name, execute);
		} else {
			client.on (name, execute);
		}
	}
}

export default Events;