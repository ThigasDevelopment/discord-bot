<div align="center">

# 🤖 Infinity Bot

**Modern Discord Bot with TypeScript, Decorators and scalable architecture**

[![Discord.js](https://img.shields.io/badge/discord.js-v14.25.1-blue.svg)](https://discord.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Features](#-features) •
[Installation](#-installation) •
[Structure](#-project-structure) •
[Usage](#-usage) •
[Decorators](#-decorators)

</div>

---

## ✨ Features

- 🎨 **Pure TypeScript** - Type-safe with experimental decorators
- 🎯 **Decorator System** - Commands and Events with modern decorators
- 🔥 **Hot Reload** - Fast development with `tsx watch`
- 📦 **Auto-Discovery** - Automatic loading of commands and events
- 🎨 **Colorful Terminal** - Custom logging system with ANSI colors
- 🔐 **Type-Safe Env** - Typed environment variables
- 🚀 **ES Modules** - Native support for modern imports
- 📁 **Path Aliases** - Clean imports with `@` aliases

## 🛠️ Tech Stack

```typescript
{
  "runtime": "Node.js 18+",
  "language": "TypeScript 5.x",
  "framework": "Discord.js v14",
  "patterns": ["Decorators", "ES Modules", "OOP"],
  "tools": ["tsx", "fast-glob", "dotenv"]
}
```

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) >= 18.0.0
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ThigasDevelopment/discord-bot.git
cd infinity-bot
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
# Discord BOT
BOT_TOKEN=your_token_here
CLIENT_ID=client_id
GUILD_ID=test_server_id (optional)
NODE_ENV=development
```

### 4. Run the bot

```bash
npm run dev
```

## 📁 Project Structure

```
infinity-bot/
├── src/
│   ├── index.ts                          # Entry point
│   ├── modules/
│   │   ├── discord/
│   │   │   ├── Client.ts                 # Main bot class
│   │   │   ├── commands/                 # Slash commands
│   │   │   │   ├── admin/                # Admin commands category
│   │   │   │   ├── user/                 # User commands category
│   │   │   │   └── Example.ts
│   │   │   └── events/                   # Event handlers
│   │   │       └── Ready.ts
│   │   └── handler/
│   │       ├── Commands.ts               # Commands auto-loader
│   │       └── Events.ts                 # Events auto-loader
│   └── utils/
│       ├── Terminal.ts                   # Colorful logging system
│       ├── decorators/
│       │   ├── Command.ts                # @Command decorator
│       │   └── Event.ts                  # @Event decorator
│       └── types/
│           └── dotenv.d.ts               # process.env typing
├── .env                                  # Environment variables (gitignored)
├── .env.example                          # Environment template
├── .gitignore                            # Git ignore rules
├── LICENSE                               # MIT License
├── package.json                          # Dependencies & scripts
├── package-lock.json                     # Locked dependencies
├── tsconfig.json                         # TypeScript configuration
└── README.md                             # Project documentation
```

## 💻 Usage

### Creating a Command

```typescript
// src/modules/discord/commands/ping.ts

import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '@decorators/Command';

@Command({
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency')
})
export class PingCommand {
  async run(interaction: ChatInputCommandInteraction) {
    const ping = interaction.client.ws.ping;
    await interaction.reply(`🏓 Pong! Latency: **${ping}ms**`);
  }
}
```

### Creating an Event

```typescript
// src/modules/discord/events/Ready.ts

import { Event } from '@decorators/Event';
import { BotClient } from '@modules/discord/Client';
import { Events } from 'discord.js';

@Event({ name: Events.ClientReady, once: true })
export default class Ready {
  async execute(client: BotClient) {
    console.log(`Logged in as ${client.user?.tag}!`);
  }
}
```

Or for repeating events:

```typescript
// src/modules/discord/events/MessageCreate.ts

import { Event } from '@decorators/Event';
import { Events, Message } from 'discord.js';

@Event({ name: Events.MessageCreate, once: false })
export default class MessageCreate {
  async execute(message: Message) {
    if (message.author.bot) return;
    console.log(`Message from ${message.author.tag}: ${message.content}`);
  }
}
```

## 🎨 Decorators

### Command Decorator

```typescript
@Command({
  data: SlashCommandBuilder  // Command configuration
})
```

**Usage:**
- Automatic registration of slash commands
- Type-safe with TypeScript
- Dynamic loading via `fast-glob`

### Event Decorator

```typescript
@Event({
  name: Events.ClientReady,  // Event name
  once: boolean              // true = once, false = on
})
```

**Usage:**
- Automatic registration of event listeners
- `once: true` for one-time events (like ClientReady)
- `once: false` for repeating events (like MessageCreate)
- Modular organization
- Must use `export default class`

## 🎨 Terminal System

```typescript
import Terminal, { Color } from '@utils/Terminal';

// Colored logs with timestamp
Terminal.log('Success message', Color.Green);
Terminal.log('Error message', Color.Red);
Terminal.log('Warning message', Color.Yellow);
Terminal.log('Info message', Color.Blue);

// Available colors
Color.Green   // '\x1b[32m'
Color.Red     // '\x1b[31m'
Color.Yellow  // '\x1b[33m'
Color.Blue    // '\x1b[34m'
Color.Black   // '\x1b[30m'
Color.Reset   // '\x1b[0m'

// Manual timestamp
const time = Terminal.timestamp(); // Returns: "14:30:45"

// Manual color formatting
const coloredText = Terminal.color('Custom text', Color.Green);
console.log(coloredText);
```

## 🔧 TypeScript Configuration

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@modules/*": ["src/modules/*"],
      "@utils/*": ["src/utils/*"],
      "@decorators/*": ["src/utils/decorators/*"]
    }
  }
}
```

**Usage in imports:**

```typescript
import { BotClient } from '@modules/discord/Client';
import Terminal from '@utils/Terminal';
import { Command } from '@decorators/Command';
```

### Decorators Enabled

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 📦 Available Scripts

```bash
# Development with hot reload
npm run dev

# Build (if configured)
npm run build

# Production start (if configured)
npm start
```

## 🌟 Implemented Features

### ✅ Core System
- [x] Custom Discord client
- [x] Commands loading system
- [x] Events loading system
- [x] Hot reload in development
- [x] Colorful terminal logs

### ✅ Decorators
- [x] `@Command` - Automatic command registration
- [x] `@Event` - Automatic event registration
- [x] Type-safe with TypeScript

### ✅ Type Safety
- [x] Full `process.env` typing
- [x] Interfaces for Commands and Events
- [x] Path aliases configured

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👤 Author

**dracoN***

- GitHub: [@ThigasDevelopment](https://github.com/ThigasDevelopment)
- Discord: [Infinity Community](https://discord.gg/seu_servidor)

## 🙏 Acknowledgments

- [Discord.js Guide](https://discordjs.guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- Infinity Community

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

Made with ❤️ by dracoN*

</div>