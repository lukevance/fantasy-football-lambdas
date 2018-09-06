const R = require('ramda');
const fetch = require('node-fetch');

// accept leagueId param
// GET http://games.espn.com/ffl/api/v2/standings?leagueId=286565&seasonId=2017

// simplify to team names and score

// enhance with other data?

const getLeagueInfo = async (leagueId) => {
    const url = `http://games.espn.com/ffl/api/v2/standings?leagueId=${leagueId}`;
    const res = await fetch(url);
    const json = await res.json();
    // transform team data
    const teams = json.teams.map(team => {
        return {
            teamName: team.teamLocation + " " + team.teamNickname,
            owners: team.owners,
            teamId: team.teamId
        }
    });
    return teams;
  }

//   getLeagueInfo(286565);
  module.exports = getLeagueInfo;