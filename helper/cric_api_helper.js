'use strict';

var Promise = require('bluebird');
var Client = require('node-rest-client').Client;
var client = new Client();
var args = {
    headers: { "apikey": "yiPB2mqlqdNnPa57Vs8P8S74DXk1" }
};

var GetCricAPIPath = function (parameters) {
    // load the base url;
    var call_type = parameters.call_type;
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
    else if (call_type === 'commentry') {
        path = GetEnvironmentVariableValue('CRIC_API_Commentry', '/api/cricketCommentary');
    }
    else if (call_type === 'news') {
        path = GetEnvironmentVariableValue('CRIC_API_NEWS', '/api/cricketNews');
    }

    full_url = fulfillment_api_path + path;

    if (typeof parameters !== 'undefined' && parameters !== null) {
        if (parameters.unique_id) {
            full_url = full_url + '?unique_id=' + parameters.unique_id;
        }
        else if (parameters.pid) {
            full_url = full_url + '?pid=' + parameters.pid;
        }
    }
    return full_url;
};

function CricAPICall(request) {
    if (!request) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = GetCricAPIPath(request);
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

var GetEnvironmentVariableValue = function (environment_variable_name, default_value) {
    return process.env[environment_variable_name] || default_value;
};

module.exports = {
    cricAPICall: CricAPICall,
    getEnvironmentVariableValue: GetEnvironmentVariableValue,

};