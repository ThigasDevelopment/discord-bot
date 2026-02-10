declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string;
			
			npm_lifecycle_event: string;
		}
	}
}

export {};