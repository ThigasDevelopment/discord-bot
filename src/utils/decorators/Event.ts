import { Events } from 'discord.js';

export interface EventData {
	name: Events | string;
	once: boolean;
};

export interface RegisteredEvent extends EventData {
	execute: (...args: any[]) => any;
};

export const GlobalEvents: RegisteredEvent[] = [];

export function Event (event: EventData) {
	return function <T extends { new (...args: any[ ]): { } }> (constructor: T) {
		const instance = new constructor ();

		GlobalEvents.push ({
			name: event.name,
			once: event.once,

			execute: (...args: any[]) => (instance as any).execute(...args),
		});

		return constructor;
	};
}