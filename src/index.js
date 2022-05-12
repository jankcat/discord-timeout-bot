const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Do you need a time out?');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'bigtimeout') {
		await interaction.deferReply();
		const members = await interaction.guild.members.fetch();

		members.forEach(async (member) => {
			// Don't timeout bots, they did nothing wrong
			if (member.user.bot) return;
			// Don't bother trying to timeout people the bot can't moderate or manage--save ourselves the API Errors
			if (!member.moderatable || !member.manageable) return;

			try {
				await member.timeout(2 * 60 * 1000, 'Everyone needed to shut up for 2 minutes.');
				console.log(`[${interaction.guild.name}][${interaction.channel.name}] ${member.user.tag} has been put in time out.`);
			} catch (timeoutError) {
				console.log(`[${interaction.guild.name}][${interaction.channel.name}] ${member.user.tag} could not be put in timeout: ${timeoutError}.`);
			}
		});

		const timeoutExpiration = new Date(Date.now() + (2 * 60 * 1000) + (15 * 1000));
		const timeString = `${timeoutExpiration.toLocaleTimeString('en-US')} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
		return await interaction.editReply(`OKAY! EVERYBODY JUST SHUT UP FOR 2 MINUTES! YOU ARE ALL IN A TIME OUT UNTIL ${timeString}`);
	}
});

client.login(process.env.DISCORD_CLIENT_TOKEN);
