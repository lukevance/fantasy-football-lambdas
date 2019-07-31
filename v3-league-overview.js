const fetch = require('node-fetch');
const R = require('ramda');
const LEAGUE_ID='';

const getleagueData = async (leagueId) => {
    const url = `http://fantasy.espn.com/apis/v3/games/ffl/seasons/2018/segments/0/leagues/${leagueId}?view=mMatchupScore&view=mPositionalRatings&view=mTeam`;
    const options = {
        method: 'GET',
        headers: {
            cookie: `espn_s2=${ESPN_S2}; SWID=${ESPN_SWID}`
        }
    }
    const res = await fetch(url, options);
    const json = await res.json();
    if (json.id && json.teams) {
        return json;
    } else {
        // console.log(json);
        // throw Error(JSON.stringify(json));
    }
};

const doit = async () => {
    const stuff = await getleagueData(LEAGUE_ID);
    console.log(stuff);
}

doit();