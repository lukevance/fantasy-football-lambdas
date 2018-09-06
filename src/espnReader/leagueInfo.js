const fetch = require('node-fetch');

//get league info for leagueId, defaults to current season, returns historical data if seasonId is supplied
module.exports = async (leagueId, seasonId) => {
  let url = 'http://games.espn.com/ffl/api/v2/teams?leagueId=' + leagueId + (seasonId ? `&seasonId=${seasonId}` : "");
  console.log(url);
  const res = await fetch(url);
  const json = await res.json();
//   console.log(res);
  return json;
};