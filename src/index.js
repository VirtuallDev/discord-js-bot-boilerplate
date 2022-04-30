import discord from 'discord.js';
import dotenv from 'dotenv';
import { CommandHandler, EventHandler } from './Utils/Handlers';

dotenv.config();

const client = new discord.Client({ intents: 32767 });

EventHandler('events', client);
CommandHandler('commands', client, true);

client.login(process.env.TOKEN);