var joi = require('joi');
var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

server.route({
    method: 'GET',
    path: '/api/news',
    config: {
        tags: ['api'],
        description: 'Get updated cricket news',
        notes: 'Get updated cricket news'
    },
    handler: function (request, reply) {
        var options = {
            call_type:"news"
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