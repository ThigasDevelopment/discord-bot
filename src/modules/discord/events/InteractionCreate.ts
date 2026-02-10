import { Events, MessageFlags } from 'discord.js';

import { BotClient } from '@modules/discord/Client';

import { Event } from '@decorators/Event';
import { BotInteraction } from '@/utils/types/controller';

import { GlobalControllers } from '@/utils/decorators/Controller';

@Event ({ name: Events.InteractionCreate, once: false })
export default class InteractionCreate {
	async parse (customId: string) {
		const customIdSegments = customId.split ('/');
		
		for (const controller of GlobalControllers) {
			const controllerSegments = controller.id.split ('/');
			
			if (controllerSegments.length !== customIdSegments.length) {
				continue;
			}
			
			let isMatch = true;
			
			const params: Record<string, string> = { };
			for (let i = 0; i < controllerSegments.length; i++) {
				const controllerSegment = controllerSegments[i];
				const customIdSegment = customIdSegments[i];
				
				if (controllerSegment.startsWith (':')) {
					const paramName = controllerSegment.substring (1);
					params[paramName] = customIdSegment;
				} else if (controllerSegment !== customIdSegment) {
					isMatch = false;
					break
				}
			}
			
			if (isMatch) {
				return [ controller.id, params ];
			}
		}
		
		return [ customId, { } ];
	}

	async execute (interaction: BotInteraction) {
		const client = interaction.client as BotClient;
		if (!client) {
			return interaction.reply ({
				content: 'Ocorreu um erro ao processar a interação.',

				flags: [ MessageFlags.Ephemeral ]
			});
		}

		if (interaction.isChatInputCommand ()) {
			await interaction.reply ({
				content: 'O BOT está pensando...',

				flags: [ MessageFlags.Ephemeral ]
			});

			const command = client.commands.get (interaction.commandName);
			if (!command) {
				return interaction.editReply ({
					content: 'Ocorreu um erro ao processar o comando.'
				});
			}

			try {
				await command.run (interaction);
			} catch (error: Error | unknown) {
				await interaction.editReply ({
					content: `Ocorreu um erro ao executar o comando: ${ error instanceof Error ? error.message : String (error) }`
				});
			}
			return interaction;
		}

		if (!interaction.isButton () && !interaction.isAnySelectMenu () && !interaction.isModalSubmit ()) {
			return false;
		}

		const [ customId, params ] = await this.parse (interaction.customId);
		if (!customId) {
			return interaction.reply ({
				content: 'Ocorreu um erro ao processar a interação.',

				flags: [ MessageFlags.Ephemeral ]
			});
		}

		const controller = GlobalControllers.find (controller => controller.id === customId);
		if (!controller) {
			return interaction.reply ({
				content: 'Ocorreu um erro ao processar a interação.',

				flags: [ MessageFlags.Ephemeral ]
			});
		}
		
		try {
			await controller.exec (interaction, params);
		} catch (error: Error | unknown) {
			await interaction.reply ({
				content: `Ocorreu um erro ao processar a interação: ${ error instanceof Error ? error.message : String (error) }`,

				flags: [ MessageFlags.Ephemeral ]
			});
		}
		return interaction;
	}
}