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
            return cric_api_helper.postResponse(options).then(function (return_data) {
                let response_body =  (return_data && return_data.statusCode === 200 && (return_data.body !== undefined || return_data.body !== null)) ? JSON.parse(return_data.body) : {}
                return reply({
                    statusCode: 200,
                    message: 'Live cricket score',
                    response: response_body
                });
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });
}