const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const CronJob = require('cron').CronJob;
const Katos = require('../models/katos.js');

const guildID = process.env.GUILD_ID;
const channelID = process.env.CHANNEL_ID;

// database initalization
const db = require('../utils/mongoose.js');
db.init();

// i want to check new entries in last hour, if there are new entries
// send a message to discord

const now = Date.now(); // unix timestamp for when it runs
const hourAgo = now - 3599; // unix timestamp for 59:99 ago

// check created_at for last hour
async function checkLastHour() {
    Katos.find({
        created_at: {$gte : hourAgo},
        created_at: {$lte : now},
    }, function(err, docs) {
        console.log(docs);
        if (docs.length < 1 || docs == undefined) {
            console.log('no new sales');
        } else {
            // send discord message
        }
    });
}
checkLastHour();

