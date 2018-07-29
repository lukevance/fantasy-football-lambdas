const scoreboardsOverPeriod = require('./scoreboards_timeperiod').scoreboardsOverPeriod;

// const results = async () => {
//     const data = await scoreboardsOverPeriod(1, 2);
//     console.log(JSON.stringify(data));
// };
// results();


const avgWinningScoreLeague = async (leagueId) => {
    const scoreBoardsEntireSeason = await scoreboardsOverPeriod(1, 13);
    const weekAvgWinningScores = scoreBoardsEntireSeason.map(scoreboard => {
        // calculate average winning score of each week
        const avgWinningScore = Math.round(scoreboard.gameSummaries.map(game => game.winner.score).reduce((total, score, i, arr) => {
            total += score;
            if (i === arr.length -1){
                return total/arr.length;
            } else {
                return total;
            }
        }) * 100) / 100;
        return {
            week: scoreboard.week,
            winningScore: scoreboard.gameSummaries.map(game => game.winner.score),
            avgWinningScore: avgWinningScore
        }
    });
    const arrayOfWinningScoresEachWeek = weekAvgWinningScores.map(week => week.avgWinningScore);
    const seasonLongAvgWinningScore = arrayOfWinningScoresEachWeek.reduce((total, score, i, arr) => {
        total += score;
        if (i === arr.length -1){
            return total/arr.length;
        } else {
            return total;
        }
    });
    return Math.round(seasonLongAvgWinningScore * 100) / 100;
}

const avgScoreToWinTeam = async (leagueId, teamId) => {

}


const test = async () => {
    const data = await avgWinningScoreLeague('286565');
    console.log(JSON.stringify(data));
}
test();