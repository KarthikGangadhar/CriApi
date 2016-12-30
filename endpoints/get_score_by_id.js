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
            var options = {
                call_type:"cricket",
                unique_id: request.payload.unique_id
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                var filtered_data;
                return_data.data.forEach(function(field){
                    if(field.unique_id === request.payload.unique_id){
                        filtered_data = field;
                    }
                })
                return reply({
                    statusCode: 200,
                    message: 'Live score',
                    data: filtered_data
                });
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });


}