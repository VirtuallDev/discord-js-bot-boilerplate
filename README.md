# Discord.js Bot Boilerplate

> To run the bot, use the `yarn start` or `npm start` command. 

> ### Command Example:
> ```js
> import { SlashCommandBuilder } from '@discordjs/builders';
> const command = {
>   data: new SlashCommandBuilder()
>       .setName("ping")
>       .setDescription("Sends Pong"),
>   execute: async (client, interaction) => {
>       return interaction.reply({content: "Pong!", ephemeral: true});
>   }
> }
> export.default = command;
> ```

> ### Event Example
> ```js
> const event = {
>   name: "ready",
>   execute: (client) => {
>       console.log(`${client.user.tag} is online!`);
>   }
> }
> export.default = command;
> ```