import { Events } from 'discord.js';

interface EventData {
	name: Events | string;
	type: 'on' | 'once';
};

export const GlobalEvents: any[ ] = [ ];

export function Event (event: EventData) {
	return function <T extends { new (...args: any[ ]): { } }> (constructor: T) {
		const instance = new constructor ();

		GlobalEvents.push ({
			name: event.name,
			type: event.type,
			execute: instance,
		});

		return constructor;
	};
}