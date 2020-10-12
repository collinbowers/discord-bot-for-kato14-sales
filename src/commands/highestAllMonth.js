const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const Katos = require('../models/katos.js');

const db = require('../utils/mongoose.js');
db.init();

const now =  new Date();
const oneMonthAgo = now.setDate(now.getDate() - 30);

var message;
async function highestAllMonth() {
    try {
        data = await Katos.find({
            soldDate : {$lte : now},
            soldDate : {$gte : oneMonthAgo}
        }).exec();
        for (i of data) {
            splitPrice = i.stickerPrice.split('$')[1].trim();
            floatPrice = parseFloat(splitPrice);
            i.stickerPrice = floatPrice;
        }
        maxPrice = Math.max.apply(Math, data.map(function(o) { return o.stickerPrice; }))
        maxObj = data.find(element => element.stickerPrice == maxPrice);
        stickerName = maxObj.stickerName.split('| ')[1];
        message = stickerName + 'at $' + maxObj.stickerPrice;

    } catch(err) {
        console.log(err);
    }
    return message;
}

highestAllMonth();

module.exports = async (msg) => {
    await msg.channel.send(message);
}