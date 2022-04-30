import { Client, Collection } from 'discord.js';
import fs from 'fs';
import { utils } from './Utils';

/**
 * 
 * @param {string} path Path of the events folder
 * @param {Client} client Main client
 */

export const EventHandler = (path, client) => {
    const events = fs.readdirSync(`./${path}/`).filter(f => f.endsWith(".js"));
    events.forEach(file => {
        const event = utils.importFile(`./${path}/${file}`);
        if (!event.name) return;
        try {
            client.on(event.name, (...args) => event.execute(client, ...args));
        } catch (err) {
            throw err;
        }
    })
}


/**
 * 
 * @param {string} path Path of the events folder
 * @param {Client} client Main client
 * @param {boolean} hasMultipleDirs Toggle if the commands directory has sub directories
 */

export const CommandHandler = (path, client, hasMultipleDirs) => {
    const commandsCollection = new Collection();
    const commandDir = fs.readdirSync(`./${path}`);
    if (hasMultipleDirs) {
        commandDir.forEach(dir => {
            const commands = fs.readdirSync(`./${path}/${dir}`).filter(f => f.endsWith(".js"));
            commands.forEach(file => {
                const command = utils.importFile(`./${path}/${dir}/${file}`);
                if (!command.name) return;
                try {
                    commandsCollection.set(command.name, command);
                } catch (err) {
                    throw err;
                }
            })
        })
    } else {
        const commands = commandDir.filter(file => file.endsWith(".js"));
        commands.forEach(file => {
            const command = utils.importFile(`./${path}/${file}`);
            if (!command.name) return;
            try {
                commandsCollection.set(command.name, command);
            } catch (err) {
                throw err;
            }
        })
    }

    client.commands = commandsCollection;

    client.on('ready', () => {
        const commands = [];
        client.commands.forEach(command => commands.push(command.data));
        client.guilds.cache.forEach(guild => {
            guild.commands?.set(commands);
        })
    })

    client.on("interactionCreate", interaction => {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(command)
        if (command) command.execute(client, interaction);
        else return interaction.reply({ content: "Command Isn't Runnable.", ephemeral: true });
    })
}