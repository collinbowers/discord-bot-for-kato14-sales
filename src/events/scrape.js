const cheerio = require ('cheerio');
const puppeteer = require ('puppeteer');
const mongoose = require('mongoose');
require('dotenv').config();
const Katos = require('../models/katos.js');

const db = require('../utils/mongoose.js');
db.init();

const page_url = process.env.SALES_URL;

async function getSales() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(page_url);
    await page.waitForSelector('.table');
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
    for (const sale of sales) {
        const data = await Katos.find({
            stickerName: sale.name,
            stickerPrice: sale.price, 
            soldDate: sale.date,
            stickerMarketplace: sale.marketplace,
            stickerRarity: sale.rarity,
        });
        if (data.length > 0) {
            console.log('Not a new sale');
        } else {
            console.log('Sale POGGERS');
            kato = new Katos({
                _id: mongoose.Types.ObjectId(),
                stickerName: sale.name,
                stickerPrice: sale.price, 
                soldDate: sale.date,
                stickerMarketplace: sale.marketplace,
                stickerRarity: sale.rarity,
            });
            await kato.save(); 
        }
    }
}

module.exports = { getSales }