var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

    server.route({
        method: 'POST',
        path: '/api/score',
        config: {
            tags: ['api'],
            description: 'Get scores by id',
            notes: 'Get scores by id',
            validate: {
                payload: {
                    unique_id: Joi.string().required()
                }
            }
        },

        handler: function (request, reply) {
            var options = request.payload;
            return cric_api_helper.cricket_particular_match_score(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'Live score',
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