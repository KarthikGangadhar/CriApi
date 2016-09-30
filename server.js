var Hapi = require('hapi');
var server = module.exports = new Hapi.Server();
var cric_api_helper = require('./helper/cric_api_helper.js');
var index = require('./helper/index.js');
server.connection({
    port: process.env.CRIC_API_PORT || 1729
});

server.register([{
    register: require('hapi-swagger'),
    options: {
        apiVersion: "0.0.1"
    }
},{
    register: index
}], function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});