const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const Katos = require('../models/katos.js');

// database initalization
const db = require('../utils/mongoose.js');
db.init();

const now = Date.now();
const halfHourAgo = now - 1800;

async function checkLastHour() {
    try {
        var messages = [];
        var messageContext;
        data = await Katos.find({
            created_at : {$lte : now},
            created_at : {$gte : halfHourAgo},
        }).exec();
        console.log(data);
        if (data.length < 1 || data == undefined) {
            console.log('no new sales');
        } else if (data.length == 1) {
            if (data[0].stickerRarity == ('Foil') || data[0].stickerRarity == ('Holo')) {
                splitTitle = data[0].stickerName.split('| ')[1];
                trimPrice = data[0].stickerPrice.split(' ').join('');
                messageContext = splitTitle + 'sold for ' + trimPrice 
                + ' on ' + data[0].stickerMarketplace;
            } else if (data[0].stickerRarity == ('Non Holo')) {
                splitTitle = data[0].stickerName.split('| ')[1];
                trimPrice = data[0].stickerPrice.split(' ').join('');
                messageContext = splitTitle + '(' + data[0].stickerRarity + ') '
                + 'sold for ' + trimPrice + ' on ' + data[0].stickerMarketplace;
            } else {
                splitTitle = data[0].stickerName;
                trimPrice = data[0].stickerPrice.split(' ').join('');
                messageContext = splitTitle + '(' + data[0].stickerRarity + ') '
                + 'sold for ' + trimPrice + ' on ' + data[0].stickerMarketplace;
            }
            await handleMessage(messageContext);
        } else {
            for (i of data) {
                if (i.stickerRarity == ('Foil') || i.stickerRarity == ('Holo')) {
                    splitTitle = i.stickerName.split('| ')[1];
                    trimPrice = i.stickerPrice.split(' ').join('');
                    messageContext = splitTitle + 'sold for ' + trimPrice 
                    + ' on ' + i.stickerMarketplace;
                } else if (i.stickerRarity == ('Non Holo')) {
                    splitTitle = i.stickerName.split('| ')[1];
                    trimPrice = i.stickerPrice.split(' ').join('');
                    messageContext = splitTitle + '(' + i.stickerRarity + ') '
                    + 'sold for ' + trimPrice + ' on ' + i.stickerMarketplace;
                } else {
                    splitTitle = i.stickerName;
                    trimPrice = i.stickerPrice.split(' ').join('');
                    messageContext = splitTitle + '(' + i.stickerRarity + ') '
                    + 'sold for ' + trimPrice + ' on ' + i.stickerMarketplace;
                }
                await handleMessage(messageContext);
            }
        }
        return messages;
        async function handleMessage(msg) {
            var message = {};
            try {
                message.context = msg;
                messages.push(message);
            } catch(error) {
                console.log(error);
            }
        }
    } catch(error) {
        console.log(error);
    }
}

module.exports = { checkLastHour }
