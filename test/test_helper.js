'use strict';

var hapi = require('hapi');
var index = require('../helper/index.js');
var server = new hapi.Server();
var Promise = require('bluebird');
var cric_api_helper = require('../helper/cric_api_helper.js');

// Create connection
server.connection({
    port: process.env.PORT || 1729,
    host: process.env.IP,
    labels: ['api'],
    routes: {
        cors: true,
        validate: {
            options: {
                allowUnknown: true
            }
        }
    }
});

// Register plugins
server.register(index, function (loadError) {
    if (loadError) {
        console.error('Failed to load a plugin:', loadError);
    }
});

module.exports = {
    get: function (url, callback) {
        var options = {
            method: 'GET',
            url: url
        };
        server.inject(options, callback);
    },
    delete: function (url, callback, payload) {
        var options = {
            method: 'DELETE',
            url: url,
            payload: payload
        };
        server.inject(options, callback);
    },
    post: function (url, payload, callback) {      
        var options = {
            method: 'POST',
            url: url,
            payload: payload
        };
        server.inject(options, callback);
    },
    put: function (url, payload, callback) {
        var options = {
            method: 'PUT',
            url: url,
            payload: payload           
        };
        server.inject(options, callback);
    }
};

