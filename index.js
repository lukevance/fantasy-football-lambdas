const cheerio = require('cheerio');
const fetchUrl = require('fetch').fetchUrl;
const tabletojson = require('tabletojson');

fetchUrl("http://games.espn.com/ffl/leaders?leagueId=286565&teamId=7&scoringPeriodId=1&seasonId=2017", 
    function(error, meta, body){
        let html = body.toString();
        let $ = cheerio.load(html);
        let playerTable = $('table#playertable_0');
        console.log(playerTable);
    }
);


// tabletojson.convertUrl(
//     '',
//     { useFirstRowForHeadings: true },
//     function(tablesAsJson) {
//       tablesAsJson.forEach(element => {
//          console.log(element.length) 
//       });
//     }
//   );