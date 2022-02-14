const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

const commands = [{
    name: 'bigtimeout',
    description: 'EVERYBODY JUST SHUT UP FOR 2 MINUTES!'
}]; 

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.tap(guild => console.log(`[${guild.name}] [ready] Rejoining server.`));
    client.user.setActivity('Do you need a time out?');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'bigtimeout') {
        var timeoutExpiration = new Date(Date.now() + (2 * 60 * 1000) + (15 * 1000));
        await interaction.reply(`OKAY! EVERYBODY JUST SHUT UP FOR 2 MINUTES! YOU ARE ALL IN A TIME OUT UNTIL ${timeoutExpiration}`);
    }
});

client.login(process.env.DISCORD_TOKEN);