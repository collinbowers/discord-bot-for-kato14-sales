const info = require('./info');
const options = require('./options');
const allPrices = require('./allKatoPrices');
const monthlyhigh = require('./highestAllMonth');
const last7days = require('./last7Days');
const dev = require('./dev')

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

const commands = {
    info,
    options,
    allPrices,
    monthlyhigh,
    last7days,
    dev,
};

module.exports = async (msg) => {
    console.log(msg);
    if (msg.guild.id === guildID && msg.channel.id === channelID){
        const args = msg.content.split(' ');
        if (args.length == 0 || args[0].charAt(0) !== '!') return;
        const command = args.shift().substr(1);
        if (Object.keys(commands).includes(command)) {
            commands[command](msg, args);
        }
    }
};