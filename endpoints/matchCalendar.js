var cric_api_helper = require('../helper/cric_api_helper.js');

module.exports = function (server, options) {

    server.route({
        method: 'GET',
        path: '/api/matchCalendar',
        config: {
            tags: ['api'],
            description: 'Upcoming match schedules',
            notes: 'Get Live cricket scores'
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'matchCalendar'
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'upcoming match schedules',
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