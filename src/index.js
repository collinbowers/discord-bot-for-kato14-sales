const Discord = require('discord.js');
require('dotenv').config();
const commandHandler = require('./commands');
const scrape = require('./events/scrape');
const checkLastHour = require('./events/checkForSales')

const client = new Discord.Client();
const channelID = process.env.CHANNEL_ID;
const roleID = process.env.ROLE_ID;

client.once('ready', () => {
	console.log('🤖 Ready!');
	client.user.setActivity('Yoinking BUFF data 🏸');
});

client.on('message', commandHandler);

client.setInterval(async function() {
	await scrape.getSales();
	client.channels.cache.get(channelID).send('scraped cantry.dev');
	const sale = await checkLastHour.checkLastHour();
		sale.forEach(element => {
			client.channels.cache.get(channelID).send('<@&' + roleID +'> '
			+ element.context);
		});
}, 1799999);

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(process.env.BOT_TOKEN);