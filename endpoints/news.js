var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');
var newsHepler = require('../helper/news_helper');

module.exports = function (server, options) {

    var joiAuthToken = Joi.string().required().description('Api_Key: The authorization key for the request');

    server.route({
        method: 'GET',
        path: '/api/news',
        config: {
            tags: ['api'],
            description: 'Get updated cricket news',
            notes: 'Get updated cricket news',
            validate: {
                query: {
                    api_key: joiAuthToken
                }
            }
        },
        handler: function (request, reply) {
            let newsResponse = {
                "statusCode": 200,
                "message": "cricket news",
                "data": {
                    "data": []
                },
                "provider": {
                    "source": "Various",
                    "url": "https://cricapi.com/",
                }
            };
            newsHepler.getNewsData().then((data) => {
                newsResponse.data.data = data;
                return reply(newsResponse);
            }).catch(function (err) {
                return replay(newsResponse);
            });
        }
    });


}