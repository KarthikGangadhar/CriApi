var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');

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
            var options = {
                call_type: "news",
                api_key: request.query.api_key
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'cricket news',
                    data: return_data
                });
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });


}