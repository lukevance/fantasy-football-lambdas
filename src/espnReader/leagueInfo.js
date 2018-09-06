const fetch = require('node-fetch');

module.exports = async (leagueId) => {
  let url = 'http://games.espn.com/ffl/api/v2/teams?leagueId=' + leagueId;
  const res = await fetch(url);
  const json = await res.json();
//   console.log(res);
  return json;
};