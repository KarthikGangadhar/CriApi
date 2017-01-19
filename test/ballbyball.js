'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var expect = require('chai').expect;
var helpers = require('./test_helper.js');
var sinon = require('sinon');
var PostInput = {
    unique_id: ""
};

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
        lab.test('get ballbyball',{ timeout: 100000}, function (done) {
            helpers.get('/api/cricket', function (response) {
                var result = response.result;
                expect(result).to.be.a('object');
                expect(result.data).to.be.a('object');
                var data = result.data.data;
                expect(data).to.be.a('array');
                expect(data[0]).to.be.a('object');
                expect(data[0].unique_id);
                PostInput.unique_id = data[0].unique_id;
                helpers.post('/api/ballByBall', PostInput, function (post_response) {
                    var result = post_response.result;
                    console.log(result);
                    expect(result).to.be.a('object');
                    done();
                });
            });
        });
    });

});
