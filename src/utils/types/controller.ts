import { AnySelectMenuInteraction, ButtonInteraction, ModalSubmitInteraction, CommandInteraction } from 'discord.js';

export type BotInteraction = ButtonInteraction | AnySelectMenuInteraction | ModalSubmitInteraction | CommandInteraction;