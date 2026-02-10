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

	static log (text: string, color: Color, bold?: boolean): any {
		return console.log (`${ this.timestamp () } ${ bold ? '\x1b[1m' : '' }${ this.color (text, color) }${ bold ? '\x1b[22m' : '' }`);
	}
};

export default Terminal;