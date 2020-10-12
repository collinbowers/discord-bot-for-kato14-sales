const cheerio = require ('cheerio');
const puppeteer = require ('puppeteer');
const mongoose = require('mongoose');
require('dotenv').config();
const Katos = require('../models/katos.js');

const db = require('../utils/mongoose.js');
db.init();

const page_url = process.env.SALES_URL;

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
                            if (sale.name.includes('Sticker')){
                                sale.rarity = 'Non Holo';
                            } else {
                                sale.rarity = 'Capsule';
                            }
                        } else if (sale.name.includes('Foil')){
                            sale.rarity = 'Foil';
                        } else {
                            sale.rarity = 'Holo';
                        }
                        sales.push(sale);
                        return (i !== 4);
                    });
                    console.log(sales);
                    sales.forEach(element => {
                        var ifExists = Katos.exists({
                            stickerName: element.name,
                            stickerPrice: element.price, 
                            soldDate: element.date,
                            stickerMarketplace: element.marketplace,
                            stickerRarity: element.rarity,
                        });
                        if (ifExists == true) {
                            console.log('Not a new sale');
                        } else {
                            console.log('New sale poggers');
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
                        }
                    })
                });
        })
}

module.exports = { getSales }