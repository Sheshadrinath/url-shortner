var request = require('request');
var mongoose = require('mongoose');

describe('Server', () => {
    var server = null;
    beforeAll(() => {
        server = require('../../app');

        //Insert seed data if doesn't exist
        //TODO: Move this seed data insertion to seperate block and invoke from here.
        var Mapping = require('../../models/Mapping.model');
        var config = require('../../config/config.json');

        mongoose.connect(config.connectionString);
        mongoose.Promise = global.Promise;
        mongoose.connection.once('open', function() {
            console.log('Mongoose connection established from test case document');

            Mapping.find({key: 'google'})
                .exec(function(error, result) {
                    if (error) throw error;
                    else {
                        if (result.length == 0) {
                            Mapping.insertMany({"key": "google", "value": "https://www.google.com"});
                        }
                    }
                })
        });
    });

    describe('While adding a new mapping', () => {
        var data = {};
        beforeAll((done) => {
            request.post('http://localhost:3000/mapping/add', {json: true, body: { "key": "hp1", "value": "https://www.hp.com", "expiry": "2100-12-31" }}, 
                    (error, response, body) => {
                        data.status = response.statusCode;
                        data.body = body;
                        done();
                    });
        });
        it ('should add a mapping if request is valid', () => {
            expect(data.status).toEqual(201);
        });

        describe('if the mapping already exists by key', () => {
            var data = {};
            beforeAll((done) => {
                request.post('http://localhost:3000/mapping/add', {json: true, body: { "key": "hp1", "value": "https://www.hp1.com", "expiry": "2100-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(201);
                console.log(data.body);
            });
        });

        describe('if the mapping already exists by value', () => {
            var data = {};
            beforeAll((done) => {
                request.post('http://localhost:3000/mapping/add', {json: true, body: { "key": "hp", "value": "https://www.hewlettpackard.com", "expiry": "2100-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(201);
                console.log(data.body);
            });
        });

        describe('After successful addition, while deleting a new mapping,', () => {
            var data = {};
            beforeAll((done) => {
                request.delete('http://localhost:3000/mapping/hp1', (error, request, body) => {
                    data.status = request.statusCode;
                    data.body = body;
                    done();
                });
            });
    
            it ('should remove the mapping removing status code 200', () => {
                expect(data.status).toBe(200);
                expect(data.body).toEqual('Removed mapping successfully!!');
            });
        });
    });
});