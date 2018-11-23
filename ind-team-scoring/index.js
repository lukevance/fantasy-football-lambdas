const R = require('ramda');

const getSingleTeamLineup = require('./lineups_scores').getSingleTeamLineup;
const curry_getSingleTeamLineup = R.curry(getSingleTeamLineup);

const getPositionMap = require('./positionMap');

const positions = ['QB', 'RB', 'WR', 'TE', 'D'];

const singlePositionStats = (pos, roster) => {
    // const singlePosition = roster.filter(plyr => plyr.player.defaultPositionId === positionMap.defaultPositionId);
    // const simplePlayerStats = singlePosition.map(plyr => {
    //     // console.info(plyr.player.firstName + plyr.player.lastName);
    //         return {
    //             "name": `${plyr.player.firstName} ${plyr.player.lastName}`,
    //             "week": week,
    //             "score": plyr.currentPeriodRealStats.appliedStatTotal,
    //             "starter": Boolean(plyr.slotCategoryId === positionMap.slotCategoryId || plyr.slotCategoryId === positionMap.flex)
    //         }
    //     });
    //     return simplePlayerStats;
    return [{summary: 'hi' + pos}];
}

const teamPositionSummary = async (pos, leagueId, teamId, week) => {
    const getSingleTeamfromLeague = curry_getSingleTeamLineup(leagueId);
    const getWeekDataForTeam = getSingleTeamfromLeague(teamId);
    const positionMap = getPositionMap(pos);
    // Get Boxscore for given team, week
    const weekBoxScore = await getWeekDataForTeam(week);
    // reduce to position summaries for that week
    const roster = weekBoxScore[0].slots;
    // console.log(roster);
    // filter for requested active position only
    

    // sort through roster and assign each position

    return ['QB', 'RB', 'WR', 'TE', 'D'].map(pos => {
        return {
            [pos]: singlePositionStats(pos, roster)
        }
    });
   
}

const test = async () => {
    const data = await teamPositionSummary('QB', '286565', 7, 11).catch(err => err);
    console.log(data);
}
test();


// module.exports = teamPositionSummary;