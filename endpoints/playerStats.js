var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');


module.exports = function (server, options) {

    var joiAuthToken = Joi.string().required().description('Api_Key: The authorization key for the request');

    server.route({
        method: 'POST',
        path: '/api/playerStats',
        config: {
            tags: ['api'],
            description: 'Get player profile',
            notes: 'Get Live cricket scores',
            validate: {
                payload: {
                    pid: Joi.string().required()
                },
                query: {
                    api_key: joiAuthToken
                }
            }
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'playerStats',
                pid: request.payload.pid,
                api_key: request.query.api_key
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                let statusCode = (return_data !== null && typeof (return_data) === 'object') ? return_data.statusCode : 200;
                let body = (return_data !== null && typeof (return_data) === 'object' && return_data.body && typeof (return_data.body) === "string") ? JSON.parse(return_data.body) : {};
                return reply({
                    statusCode: statusCode,
                    message: 'player profile',
                    data: body
                });
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });


}