const R = require('ramda');
const getTeamsList = require('./espnReader/leagueInfo');

// accept leagueId param
// GET http://games.espn.com/ffl/api/v2/standings?leagueId=286565&seasonId=2017

const getLeagueInfo = async (leagueId) => {
    const json = await getTeamsList(leagueId);
    // transform team data
    const teams = json.teams.map(team => {
        return {
            teamName: team.teamLocation + " " + team.teamNickname,
            owners: team.owners,
            teamId: team.teamId
        }
    });
    // console.log(teams);
    return teams;
  }

//   getLeagueInfo(286565);
  module.exports = getLeagueInfo;