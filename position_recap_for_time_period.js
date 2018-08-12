// GOAL: total points and review of players over given period
// 
// sample returned payload
// given position=QB, timePeriodStart=1, timePeriodEnd=4
// return [{
//     "name": "Philip Rivers",
//     "games": [{
//             "week": 1,
//             "points": 14
//         },
//         {
//             "week": 2,
//             "points": 11
//         }
//     ]
// }]

const R = require('ramda');
const getSingleTeamLineup = require('./espnReader/lineups_scores').getSingleTeamLineup;
const curry_getSingleTeamLineup = R.curry(getSingleTeamLineup);
const getSingleTeamfromLeague = curry_getSingleTeamLineup('286565');
const getWeeksForTeam = getSingleTeamfromLeague(7);

const getPositionMap = require('./positionMap');

const positionStatsOverPeriod = async (pos, timePeriodStart, timePeriodEnd) => {
    const timePeriod = R.range(timePeriodStart, timePeriodEnd + 1);
    const positionMap = getPositionMap(pos);
    // Cycle through timePeriod range to get scoreboard for each week
    const positionReview = await Promise.all(timePeriod.map( async week => {
        const weekDetails = await getWeeksForTeam(week);
        // isolate player info
        const roster = weekDetails[0].slots;
        // filter for requested active position only
        const singlePosition = roster.filter(plyr => plyr.player.defaultPositionId === positionMap.defaultPositionId);
        // console.info(singlePosition.length);
        const simplePlayerStats = singlePosition.map(plyr => {
        // console.info(plyr.player.firstName + plyr.player.lastName);
            return {
                "name": `${plyr.player.firstName} ${plyr.player.lastName}`,
                "week": week,
                "score": plyr.currentPeriodRealStats.appliedStatTotal,
                "active": Boolean(plyr.slotCategoryId === positionMap.slotCategoryId)
            }
        });
        return simplePlayerStats;
    }));
    return positionReview;
}

const results = async () => {
    const data = await positionStatsOverPeriod('QB', 1, 13);
    console.log(data);
};

results();