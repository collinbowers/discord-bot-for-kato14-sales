const cheerio = require ('cheerio');
const puppeteer = require ('puppeteer');
const mongoose = require('mongoose');
require('dotenv').config();
const Katos = require('../models/katos.js');

const db = require('../utils/mongoose.js');
db.init();

// scrape to grab current prices -> works with !prices command
// current != recent sales

const prices_url = process.env.PRICES_URL;

async function getPrices() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(prices_url);
    await page.waitForSelector('body > div > div.customBackGround.container-fluid');
    const content = await page.content();
    const $ = cheerio.load(content);
    const table = $('body > div > div.customBackGround.container-fluid');
    const prices = [];
    // iterate through table
    // table -> div (row) -> span (each sticker) -> span -> div (each version of sticker) -> span -> span -> price/name
    // foreach div(row)
    // foreach span (each sticker)
    // foreach div (each version of sticker)
    // get price/name
    console.log(prices);
}

getPrices();

module.exports = { getPrices }