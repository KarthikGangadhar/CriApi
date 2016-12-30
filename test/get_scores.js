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
        lab.test('get all cricket score', function (done) {
                helpers.get('/api/cricket', function (response) {
                    var result = response.result;
                    expect(result).to.be.a('object');
                    expect(result.data).to.be.a('object');
                    var data = result.data.data;   
                    // var count = Math.floor( Math.random() * ( 1 + data.length ) );                                     
                    expect(data).to.be.a('array');
                    expect(data[0]).to.be.a('object');
                    expect(data[0].unique_id);
                    expect(data[0].description);
                    expect(data[0].title);
                    done();
                });
        });
    });

});
