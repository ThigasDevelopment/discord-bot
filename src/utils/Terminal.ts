export enum Color {
	Green = '\x1b[32m',
	Red = '\x1b[31m',
	Yellow = '\x1b[33m',
	Blue = '\x1b[34m',
	Reset = '\x1b[0m',
	Black = '\x1b[30m',
};

export class Terminal {
	static color (text: string, color: Color): string {
		return `${ color }${ text }${ Color.Reset }`;
	}

	static timestamp (): string {
		return new Date ().toLocaleTimeString ('pt-BR');
	}

	static log (text: string, color: Color): any {
		return console.log (`${ this.timestamp () } ${ this.color (text, color) }`);
	}
};

export default Terminal;