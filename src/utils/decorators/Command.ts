import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface CommandData {
	data: SlashCommandBuilder;
};

export interface RegisteredCommand extends CommandData {
	run: (interaction: ChatInputCommandInteraction) => any;
};

export const GlobalCommands: RegisteredCommand[ ] = [ ];

export function Command (command: CommandData) {
	return function <T extends { new (...args: any[ ]): { } }> (constructor: T) {
		const instance = new constructor ();

		GlobalCommands.push ({
			data: command.data,

			run: (interaction: ChatInputCommandInteraction) => (instance as any).run (interaction),
		});

		return constructor;
	};
}