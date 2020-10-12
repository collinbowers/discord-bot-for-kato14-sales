require('dotenv').config();
const ownerID = process.env.OWNER_ID;

module.exports = async (msg) => {
    await msg.channel.send('Built by <@!' + ownerID +'>.\nVisit the projects repository: https://github.com/collinbowers/discord-bot-for-kato14-sales');
};