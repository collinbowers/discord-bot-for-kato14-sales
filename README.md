# discord-bot-for-kato14-sales
Discord bot combined with a node.js webscraper for gathering recent sales of Katowice 2014 stickers.

# TODO

* [X] Scrape cantry.dev table for recent Katowice 2014 sticker sales
    * [X] Get most recent sale, save it as current/last sale
    * [X] Run script every X time, compare new recent sale to last sale
        * [X] if new != last, send discord message
* [ ] Commands
    * [X] Info / command list
    * [X] last 7 days of kato sales
    * [X] highest kato sale last 30days
    * [ ] price of X sticker (user input) -> pull from https://cantry.dev/katowice/14/prices
    * [ ] list price of all katos in descending order
* [ ] Build dockerfile
    * [ ] deploy on raspberry pi (?)


# Bot Architecture  

* Every 30 minutes, scrape internet for new kato sales. Grab last 5 sales, comparing to db. If they don't exist, create new entry for each.

* After scrape is completed, bot checks db for recent entries within last 2 minutes. If there are new entries, notify users for each (send message).

* Create various commands that interface with db to allow users to find out data around katowice 2014 stickers.