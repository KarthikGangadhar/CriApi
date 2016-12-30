'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var helpers = require('./test_helper.js');
var sinon = require('sinon');
var PostInput = {
    "unique_id": "936147"
}

lab.experiment('Endpoints: ', function () {
    var sandbox;

    lab.before(function (done) {
        setTimeout(function () {
            sandbox = sinon.sandbox.create();
            process.nextTick(done);
        }, 1500);
    });
    // run this function after all the test in this experiment get run.
    lab.after(function (done) {
        sandbox.restore();
        done();
    });

    lab.experiment('Unit Tests: ', function () {
        lab.test('get CricketScore', { timeout: 100000 }, function (done) {
            helpers.post('/api/cricketScore', PostInput, function (post_response) {
                var result = post_response.result;
                expect(result).to.be.a('object');
                done();
            });
        });
    });

});
