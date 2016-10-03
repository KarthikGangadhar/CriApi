var Joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

    server.route({
        method: 'POST',
        path: '/api/news',
        config: {
            tags: ['api'],
            description: 'Get cricket news by id',
            notes: 'Get cricket news by id',
            validate: {
                payload: {
                    unique_id: Joi.string().required()
                }
            }
        },
        handler: function (request, reply) {
            var options = request.payload;
            return cric_api_helper.cricket_live_news(options).then(function (return_data) {
                if (return_data && return_data.data) {
                    var data = return_data.data;
                    var response = { };
                    for (var count in data) {
                        if (data[count].unique_id === request.payload.unique_id) {
                            response = data[count];
                            break;
                        }
                    }
                    return reply({
                        statusCode: 200,
                        message: 'cricket news',
                        data: response
                    });
                }
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });


}