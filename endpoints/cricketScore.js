var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');


module.exports = function (server, options) {

    server.route({
        method: 'POST',
        path: '/api/cricketScore',
        config: {
            tags: ['api'],
            description: 'Get Live cricket scores',
            notes: 'Get Live cricket scores',
            validate: {
                payload: {
                    unique_id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'cricketScore',
                unique_id: request.payload.unique_id
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