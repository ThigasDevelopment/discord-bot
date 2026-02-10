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
		console.clear ();

		await client.login (process.env.BOT_TOKEN);
		Terminal.log ('BOT is running successfully!', Color.Green);
	} catch (error: Error | unknown) {
		Terminal.log (`Error during bot initialization: ${ error instanceof Error ? error.message : String (error) }`, Color.Red);
	}
}

run ();