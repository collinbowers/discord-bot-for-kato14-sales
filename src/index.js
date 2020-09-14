const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const scrape = require('./events/scrape');
const commandHandler = require('./commands');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('🤖 Ready!');
	scrape.getSales(); 
});

client.on('message', commandHandler);

fs.readdir('./events/', (err, files) => {
	if (err) return console.error;
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const evt = require('./events/${file}');
		let evtName = file.split('.')[0];
		console.log(`Loaded event '${evtName}'`);
		client.on(evtName, evt.bind(null, client));
	});
});

client.login(process.env.BOT_TOKEN);
