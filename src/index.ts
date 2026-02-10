import { BotClient } from '@/discord/Client';

import dotenv from 'dotenv';
dotenv.config ();

import Terminal, { Color } from '@utils/Terminal';

async function run () {
	const client = new BotClient ();
	if (!client) {
		return Terminal.log ('Failed to initialize the bot client.', Color.Red);
	}

	try {
		await client.start (process.env.BOT_TOKEN);
	} catch (error: Error | unknown) {
		Terminal.log (`Error during bot initialization: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
	}
}

run ();