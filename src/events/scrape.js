const cheerio = require ('cheerio');
const puppeteer = require ('puppeteer');
const mongoose = require('mongoose');
const Discord = require('discord.js');
require('dotenv').config();
const CronJob = require('cron').CronJob;
const Katos = require('../models/katos.js');

// database initalization
const db = require('../utils/mongoose.js');
db.init();

const page_url = process.env.SCRAPE_URL;

async function getSales() {
    puppeteer.launch({ headless: true })
        .then(async (browser) => {
            const page = await browser.newPage();
            page.goto(page_url)
            page.waitForSelector('.table')
                .then(async () => {
                    const content = await page.content();
                    const $ = cheerio.load(content);
                    const table = $('.table');
                    const sales = [];
                    table.find('tbody tr').each((i, element) => {
                        const $element = $(element);
                        const sale = {};
                        sale.name = $element.find('td').eq(1).text();
                        sale.price = $element.find('td').eq(2).text();
                        sale.date = $element.find('td').eq(3).text();
                        sale.marketplace = $element.find('td').eq(4).text();
                        if ($element.find('td').eq(0).hasClass('table-normal')) {
                            sale.rarity = 'Non Holo';
                        } else {
                            sale.rarity = 'Holo';
                        }
                        sales.push(sale);
                        return (i !== 9);
                    });
                    sales.forEach(element => {
                        Katos.countDocuments({
                            stickerName: element.name,
                            stickerPrice: element.price, 
                            soldDate: element.date,
                            stickerMarketplace: element.marketplace,
                            stickerRarity: element.rarity
                        }, function (err, count){
                            if (count > 0) {
                                continue;
                            } else {
                                kato = new Katos({
                                    _id: mongoose.Types.ObjectId(),
                                    stickerName: element.name,
                                    stickerPrice: element.price, 
                                    soldDate: element.date,
                                    stickerMarketplace: element.marketplace,
                                    stickerRarity: element.rarity,
                                });
                                kato.save()
                                    .then (result => console.log(result))
                                    .catch (err => console.error(err));
                                console.log('New Kato Sale! :D');      
                            }
                        });
                    })
                });
        })
}

module.exports = { getSales }