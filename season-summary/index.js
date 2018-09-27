const seasonSummary = require('./seasonSummary');

exports.handler = async (event) => {
    // call season summary, check for errors from API
    const data = await seasonSummary(event.pathParameters.proxy).catch(err => err);
    if (data.games){
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        return response;
    } else {
        const response = {
            statusCode: 401,
            body: JSON.stringify(data)
        };
        return response;
    }
};