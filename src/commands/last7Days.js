const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const Katos = require('../models/katos.js');

const db = require('../utils/mongoose.js');
db.init();

const now =  new Date();
const sevenDaysAgo = now.setDate(now.getDate() - 7); 
var messageEmbed;
async function lastSevenDays() {
    try {
        data = await Katos.find({
            soldDate : {$lte : now},
            soldDate : {$gte : sevenDaysAgo}
        }).exec();
        if (data.length == 0 || undefined) {
            message = 'No recent sales';
        } else {
            messageEmbed = {
                embed: {
                    color: 3447003,
                    title: "All sales from last 7 days: ",
                    fields: []
                }
            }
            data.forEach(element => {
                stickerPrice = element.stickerPrice.split(' ').join('');
                if (element.stickerName.includes('Sticker')){
                    stickerName = element.stickerName.split('| ')[1];
                } else {
                    stickerName = element.stickerName;
                }
                soldDate = element.soldDate;
                    let day = soldDate.getDate().toString().padStart(2, '0');
                    let month = (1 + soldDate.getMonth()).toString().padStart(2, '0');
                    let year = soldDate.getFullYear();
                    const date = month + '/' + day + '/' + year;
                messageObj = {};
                if (element.stickerRarity == 'Holo' || 'Foil'){
                    messageObj.name = stickerName;
                } else if (element.stickerRarity == 'Non Holo' || 'Capsule') {
                    messageObj.name = stickerName + ' (' + element.stickerRarity + ')';
                } 
                messageObj.value = stickerPrice + ' on ' + element.stickerMarketplace;
                messageObj.date = date;
                messageEmbed['embed']['fields'].push(messageObj);
            });
        }
    } catch (err) {
        console.log(err);
    }
    return messageEmbed;
}

lastSevenDays();

module.exports = async (msg) => {
    await msg.channel.send(messageEmbed);
}