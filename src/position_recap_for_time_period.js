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
        // console.log(roster);
        // filter for requested active position only
        const singlePosition = roster.filter(plyr => plyr.player.defaultPositionId === positionMap.defaultPositionId);
        // if (week === 1) console.info(singlePosition);
        const simplePlayerStats = singlePosition.map(plyr => {
        // console.info(plyr.player.firstName + plyr.player.lastName);
            return {
                "name": `${plyr.player.firstName} ${plyr.player.lastName}`,
                "week": week,
                "score": plyr.currentPeriodRealStats.appliedStatTotal,
                "starter": Boolean(plyr.slotCategoryId === positionMap.slotCategoryId || plyr.slotCategoryId === positionMap.flex)
            }
        });
        return simplePlayerStats;
    }));
    return positionReview;
}

const results = async () => {
    const data = await positionStatsOverPeriod('QB', 7, 11);
    console.log(data);
};

results();