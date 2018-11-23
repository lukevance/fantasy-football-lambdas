const positionSummary = require('./weekPositionSummary');

exports.handler = async (event) => {
    // establish default response properties
    const response = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };
    // call season summary, check for errors from API
    if (event.pathParameters 
            && event.pathParameters.hasOwnProperty('leagueId')
            && event.pathParameters.hasOwnProperty('teamId')
            && event.pathParameters.hasOwnProperty('week')
        ) {
        const data = await positionSummary(event.pathParameters.leagueId, event.pathParameters.teamId, event.pathParameters.week).catch(err => err);
        // if useful data came back add it to the response body
        if (data.length > 0 && data[0].QB) {
            response.statusCode = 200;
            response.body = JSON.stringify(data);
        } else {
            // if no useful data, assume private league and pass error
            response.statusCode = 401;
            response.body = data.message;
        }
    } else {
        // if no leagueId was passed through ... should be handled by API gateway
        response.statusCode = 404;
        response.body = {
            message: 'no {leagueId} provided'
        };
    }
    return response;
};