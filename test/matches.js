'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var helpers = require('./test_helper.js');
var sinon = require('sinon');

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
        lab.test('get completed cricket score', { timeout: 100000 }, function (done) {
            helpers.get('/api/matches', function (response) {
                var result = response.result;
                expect(result).to.be.a('object');
                // console.log(result);
                expect(result.data).to.be.a('object');
                var matches = result.data.matches;
                expect(matches).to.be.a('array');
                done();
            });
        });
    });

});
