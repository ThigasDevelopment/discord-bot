import { BotClient } from '@/discord/Client';

import dotenv from 'dotenv';
dotenv.config ();

async function run () {
	const client = new BotClient ();
	if (!client) {
		return console.error ('❌ Failed to initialize the bot client.');
	}

	try {
		console.clear ();

		await client.login (process.env.BOT_TOKEN);
		console.log (`✅ BOT ${ client.user?.username } is running successfully!`);
	} catch (error) {
		console.error ('❌ An error occurred while running the bot:', error);
	}
}

run ();