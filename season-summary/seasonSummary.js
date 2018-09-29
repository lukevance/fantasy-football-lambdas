const fetch = require('node-fetch');
const R = require('ramda');


const getleagueData = async (leagueId) => {
    let url = 'http://games.espn.com/ffl/api/v2/teams?leagueId=' + leagueId;
    const res = await fetch(url);
    const json = await res.json();
    if (json.metadata && json.teams) {
        return json.teams
    } else {
        // console.log(json);
        throw Error(JSON.stringify(json));
    }
}

const getTeam = (matchup, homeAway) => {
    const TEAM_KEY = `${homeAway}Team`;
    const TEAM_SCORE = `${homeAway}TeamScores`
    return {
        teamId: matchup[TEAM_KEY].teamId,
        teamName: `${matchup[TEAM_KEY].teamLocation} ${matchup[TEAM_KEY].teamNickname}`,
        score: matchup[TEAM_SCORE][0]
    }
}

const getWinner = (matchup) => {
    switch (matchup.outcome) {
        case 1:
            return getTeam(matchup, "home");
        case 2:
            return getTeam(matchup, "away");
        case 3:
            return "tie"
        default:
            throw Error("incorrect matchup object type" + JSON.stringify(matchup));
    }
}

const getLoser = (matchup) => {
    switch (matchup.outcome) {
        case 1:
            return getTeam(matchup, "away");
        case 2:
            return getTeam(matchup, "home");
        case 3:
            return "tie"
        default:
            throw Error("incorrect matchup object type" + JSON.stringify(matchup));
    }
}

const allGamesPlayed = async (leagueId) => {
    const teams = await getleagueData(leagueId);
    let games = [];
    teams.forEach(team => {
        const played = team.scheduleItems.filter(item => item.matchups[0].outcome !== 0);
        return played.forEach(game => {
            games.push({
                week: game.matchupPeriodId,
                winner: getWinner(game.matchups[0]),
                loser: getLoser(game.matchups[0])
            });
        });
    });
    // filter out duplicates and return all unique games
    return R.uniq(games);
}

const gameSummary = async (leagueId) => {
    const games = await allGamesPlayed(leagueId);
    return {
        averageWinningScore: await R.median(games.map(game => game.winner.score)),
        averageLosingScore: await R.median(games.map(game => game.loser.score)),
        games: games
    }
}

// const test = async () => {
//     const data = await gameSummary('286564').catch(err => err);
//     console.log(data);
// }
// test();

module.exports = gameSummary;