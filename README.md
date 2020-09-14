# discord-bot-for-kato14-sales
Discord bot combined with a node.js webscraper for gathering recent sales of Katowice 2014 stickers.

# TODO

* [X] Scrape cantry.dev table for recent Katowice 2014 sticker sales
    * [X] Get most recent sale, save it as current/last sale
    * [X] Run script every X time, compare new recent sale to last sale
        * [ ] if new != last, send discord message
* [ ] Cron scraper on bot index
* [ ] Commands
    * [X] Info / command list
    * [ ] last 7 days of kato sales
    * [ ] highest kato sale last 30days
    * [ ] price of X sticker (user input) -> pull from https://cantry.dev/katowice/14/prices
    * [ ] list price of all katos in descending order