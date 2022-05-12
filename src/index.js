const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Do you need a time out?');
});

client.on('messageCreate', async message => {
    try {
        if (message.system || message.author.bot) return;
        if (message.content.startsWith('/bigtimeout') || message.content.startsWith('|bigtimeout')) {
            console.log(`[${message.guild.name}][${message.channel.name}] ${message.author.username} thinks everyone needs a time out...`);
            await message.guild.members.fetch().then(async fetchedMembers => {
                await fetchedMembers.forEach(async member => {
                    try {
                        await member.timeout(2 * 60 * 1000, 'Everyone needed to shut up for 2 minutes.');
                        console.log(`[${message.guild.name}][${message.channel.name}] ${member.user.username} has been put in time out.`);
                    } catch (timeoutError) {
                        console.log(`[${message.guild.name}][${message.channel.name}] ${member.user.username} could not be put in timeout: ${timeoutError}.`);
                    }
                });
            });
            var timeoutExpiration = new Date(Date.now() + (2 * 60 * 1000) + (15 * 1000));
            message.channel.send(`OKAY! EVERYBODY JUST SHUT UP FOR 2 MINUTES! YOU ARE ALL IN A TIME OUT UNTIL ${timeoutExpiration}`);
        }
    } catch (e) {
        console.log(e);
    }
});

client.login(process.env.DISCORD_TOKEN_TIMEOUT);
