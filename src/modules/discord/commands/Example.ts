import { SlashCommandBuilder } from 'discord.js';

import { Command } from '@decorators/Command';
import { BotInteraction } from '@/utils/types/controller';

@Command ({
	data: new SlashCommandBuilder ()
		.setName ('example')
		.setDescription ('Created an example command!')
})
export class Example {
	async run (interaction: BotInteraction) {
		await interaction.editReply ({ content: 'This is an example command!' });
	}
}