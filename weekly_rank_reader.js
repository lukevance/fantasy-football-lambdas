const $ = require('cheerio');
const fs = require('fs');

const htmlString = fs.readFileSync('../fantasy-football-app/data/weekly_ranks/week_1/QB_ranks.html').toString()
const parsedHTML = $.load(htmlString)


let players = parsedHTML('a .flexpop').attr('playerId');
let dalvinCook = parsedHTML("tr #plyr15966").children('a').children();

// fs.writeFileSync('singlePlayerRow.json', JSON.stringify(players));

console.log(dalvinCook);
// console.log('--------------');
// console.log(Object.keys(players._root['0'].children['0']));
// console.log('-----------------------');
// console.log(players._root['0'].children['0']);
