import { SlashCommandBuilder } from 'discord.js';

import { Command } from '@decorators/Command';

@Command ({
	data: new SlashCommandBuilder ()
		.setName ('example')
		.setDescription ('Created an example command!')
})
export class Example {
	run () {
		return 'Pong!';
	}
}