var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');


module.exports = function (server, options) {

    var joiAuthToken = Joi.string().required().description('Api_Key: The authorization key for the request');

    server.route({
        method: 'POST',
        path: '/api/playerFinder',
        config: {
            tags: ['api'],
            description: 'Get PID for players by name',
            notes: 'Get Live cricket scores',
            validate: {
                payload: {
                    name: Joi.string().required()
                },
                query: {
                    api_key: joiAuthToken
                }
            }
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'playerFinder',
                name: request.payload.name,
                api_key: request.query.api_key
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'Live cricket score',
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