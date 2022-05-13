const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_CLIENT_TOKEN);

(async () => {
	try {
		console.log('Registering application slash command.');

		await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [ { name: 'bigtimeout', description: 'Puts the whole server in timeout for 2 minutes' } ] });

		console.log('Successfully registered application slash command.');
	} catch (error) {
		console.error(error);
	}
})();