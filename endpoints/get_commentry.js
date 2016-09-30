var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

    server.route({
        method: 'POST',
        path: '/api/commentry',
        config: {
            tags: ['api'],
            description: 'Get Live cricket commentry',
            notes: 'Get Live cricket commentry',
            validate: {
                payload: {
                    unique_id: Joi.string().required()
                }
            }
        },

        handler: function (request, reply) {
            var options = request.payload;
            return cric_api_helper.cricket_live_commentry(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'commentry',
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