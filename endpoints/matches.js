var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

    server.route({
        method: 'GET',
        path: '/api/matches',
        config: {
            tags: ['api'],
            description: 'Get Live cricket scores',
            notes: 'Get Live cricket scores'
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'matches'
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