const leagueInfo = require('./generalLeagueInfo');
// const teamRosterSummary = require(''); --> need this function


const leagueSummaryData = async (leagueInfo) => {
    const teams = await leagueInfo(leagueId);
    const withRosters = teams.map(team => {

    })

}