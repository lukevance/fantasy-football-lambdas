const R = require('ramda');

const getSingleTeamLineup = require('./lineups_scores').getSingleTeamLineup;
const curry_getSingleTeamLineup = R.curry(getSingleTeamLineup);

const getPositionMap = require('./positionMap');

const positions = ['QB', 'RB', 'WR', 'TE', 'D'];

const singlePositionStats = (pos, roster) => {
    const positionMap = getPositionMap(pos);
    const singlePosition = roster.filter(plyr => plyr.player.defaultPositionId === positionMap.defaultPositionId);
    const simplePlayerStats = singlePosition.map(plyr => {
        // console.info(plyr.player.firstName + plyr.player.lastName);
            return {
                "name": `${plyr.player.firstName} ${plyr.player.lastName}`,
                // "week": week,
                "score": plyr.currentPeriodRealStats.appliedStatTotal || 0,
                "starter": Boolean(plyr.slotCategoryId === positionMap.slotCategoryId || plyr.slotCategoryId === positionMap.flex),
                "isBye": Boolean(plyr.opponentProTeamId < 0)
            }
        });
    return simplePlayerStats;
    // return [{summary: 'hi' + pos}];
}

const teamPositionSummary = async (leagueId, teamId, week) => {
    const getSingleTeamfromLeague = curry_getSingleTeamLineup(leagueId);
    const getWeekDataForTeam = getSingleTeamfromLeague(teamId);
    
    // Get Boxscore for given team, week
    const weekBoxScore = await getWeekDataForTeam(week);
    // reduce to position summaries for that week
    const roster = weekBoxScore[0].slots;
    // console.log(roster);
    // filter for requested active position only
    

    // sort through roster and assign each position

    return ['QB', 'RB', 'WR', 'TE', 'D'].map(pos => {
        const playerSummary = singlePositionStats(pos, roster)
        return {
            [pos]: {
                starterTotal: R.sum(playerSummary.filter(plyr => plyr.starter).map(plyr => plyr.score)),
                rosterTotal: R.sum(playerSummary.map(plyr => plyr.score)),
                players: playerSummary
            }
        }
    });
   
}

const test = async () => {
    const data = await teamPositionSummary('286565', 7, 11).catch(err => err);
    console.log(JSON.stringify(data));
}
test();


// module.exports = teamPositionSummary;