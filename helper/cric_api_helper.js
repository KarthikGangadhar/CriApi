'use strict';

var Promise = require('bluebird');
var Client = require('node-rest-client').Client;
var client = new Client();

function Cricket_Live_Scores(request) {
    if (!request) {
        successful_pull = false;
        return Promise.resolve(successful_pull);
    }
    if (request) {
        return new Promise(function (resolve, reject) {
            var url = process.env.CRIC_LIVE_SCORE_URL;
            url = 'http://cricapi.com/api/cricket';

            client.get(url, function (error, data, response) {
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
            client.get(url, function (error, data, response) {
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
            client.get(url, function (error, data, response) {
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
            url = 'http://cricapi.com/api/cricketCommentary?unique_id='+request.unique_id;
            client.get(url, {timeout:2000000},function (error, data, response) {
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

module.exports = {
    cricket_live_scores: Cricket_Live_Scores,
    cricket_particular_match_score: Cricket_Particular_Match_Score,
    cricket_live_news: Cricket_Live_News,
    cricket_live_commentry: Cricket_Live_Commentry
};