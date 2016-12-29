'use strict';

var Promise = require('bluebird');
var Client = require('node-rest-client').Client;
var apikey = "yiPB2mqlqdNnPa57Vs8P8S74DXk1";
var client = new Client(apikey);
var args = {
    parameters: { apikey: "yiPB2mqlqdNnPa57Vs8P8S74DXk1" },
    headers: { "apikey": "yiPB2mqlqdNnPa57Vs8P8S74DXk1" },
    data: "yiPB2mqlqdNnPa57Vs8P8S74DXk1"
};


var GetCricAPIPath = function (call_type, parameters) {
    // load the base url;

    var fulfillment_api_path = GetEnvironmentVariableValue('CRIC_API_URL', 'http://cricapi.com');
    var path = '';
    var full_url = '';

    // determine which path to use
    if (call_type === 'matches') {
        path = GetEnvironmentVariableValue('CRIC_API_MATCHES', '/api/matches');
    }
    else if (call_type === 'cricket') {
        path = GetEnvironmentVariableValue('CRIC_API_CRICKET', '/api/cricket');
    }
    else if (call_type === 'cricketScore') {
        path = GetEnvironmentVariableValue('CRIC_API_CRICKETSCORE', '/api/cricketScore');
    }
    else if (call_type === 'matchCalendar') {
        path = GetEnvironmentVariableValue('CRIC_API_MATCHCALENDER', '/api/matchCalendar');
    }
    else if (call_type === 'playerStats') {
        path = GetEnvironmentVariableValue('CRIC_API_PLAYERSTATS', '/api/playerStats');
    }

    full_url = fulfillment_api_path + path;

    if (typeof parameters !== 'undefined' && parameters !== null) {
        if (parameters.unique_id) {
            full_url = full_url + '?unique_id=' +parameters.unique_id;
        }
        else if (parameters.pid) {
            full_url = full_url + parameters.pid;
        }
    }
    return full_url;
};

function Cricket_Live_Scores(request) {
    if (!request) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_LIVE_SCORE_URL;
            url = 'http://cricapi.com/api/cricket';

            client.get(url, args, function (error, data, response) {
                if (error) {
                    resolve(error);
                } else if (data) {
                    resolve(data);
                } else {
                    resolve(response);
                }

            });
        });
    }
}

function CricAPICall(request) {
    if (!request) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_LIVE_SCORE_URL;
            url = GetCricAPIPath(request.call_type, request);

            // if (!request.unique_id) {
            client.get(url, args, function (error, data, response) {
                if (error) {
                    resolve(error);
                } else if (data) {
                    resolve(data);
                } else {
                    resolve(response);
                }

            });
            // }
            // else {
            //     client.post(url, args, function (error, data, response) {
            //         if (error) {
            //             resolve(error);
            //         } else if (data) {
            //             resolve(data);
            //         } else {
            //             resolve(response);
            //         }

            //     });
            // }

        });
    }
}

function Cricket_Particular_Match_Score(request) {
    var successful_pull = false;
    if (!request || !request.unique_id) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_MATCH_SCORE_API_URL + request.unique_id;
            url = 'http://cricapi.com/api/cricketScore?unique_id=' + request.unique_id;
            client.get(url, args, function (error, data, response) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else if (data) {
                    console.log(data);
                    resolve(data);
                } else {
                    console.log(response);
                    resolve(response);
                }

            });
        });
    }
}

function Cricket_Live_News(request) {
    var successful_pull = false;
    if (!request) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_NEWS_API_URL
            url = 'http://cricapi.com/api/cricketNews';
            client.get(url, args, function (error, data, response) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else if (data) {
                    console.log(data);
                    resolve(data);
                } else {
                    console.log(response);
                    resolve(response);
                }

            });
        });
    }
}

function Cricket_Live_Commentry(request) {
    var successful_pull = false;
    if (!request || !request.unique_id) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_COMMENTRY_API_URL + request.unique_id;
            url = 'http://cricapi.com/api/cricketCommentary?unique_id=' + request.unique_id;
            client.get(url, args, { timeout: 2000000 }, function (error, data, response) {
                if (error) {
                    console.log(error);
                    resolve(error);
                } else if (data) {
                    console.log(data);
                    resolve(data);
                } else {
                    console.log(response);
                    resolve(response);
                }
            });
        });
    }
}

var GetEnvironmentVariableValue = function (environment_variable_name, default_value) {
    return process.env[environment_variable_name] || default_value;
};


module.exports = {
    cricket_live_scores: Cricket_Live_Scores,
    cricket_particular_match_score: Cricket_Particular_Match_Score,
    cricket_live_news: Cricket_Live_News,
    cricket_live_commentry: Cricket_Live_Commentry,
    getEnvironmentVariableValue: GetEnvironmentVariableValue,
    cricAPICall: CricAPICall,


};