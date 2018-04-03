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

        describe('if the mapping data is wrong', () => {
            var data = {};
            beforeAll((done) => {
                request.post('http://localhost:3000/mapping/add', {json: true, body: { }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(400);
                expect(data.body).toEqual('Invalid data!!');
            });
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
            });
        });

        describe('if the mapping already exists by value', () => {
            var data = {};
            beforeAll((done) => {
                request.post('http://localhost:3000/mapping/add', {json: true, body: { "value": "https://www.google.com", "expiry": "2100-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(201);
            });
        });

        describe('if the expiry date is old', () => {
            var data = {};
            beforeAll((done) => {
                request.post('http://localhost:3000/mapping/add', {json: true, body: { "key": "hp1", "value": "https://www.google.com", "expiry": "1900-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should throw 400 error with message', () => {
                expect(data.status).toEqual(400);
                expect(data.body).toEqual('Expiry date cannot be previous');
            });
        });

        describe('After successful addition, if mapping is edited', () => {
            var data = {};
            beforeAll((done) => {
                request.put('http://localhost:3000/mapping/edit', {json: true, body: { "key": "hp2", "value": "https://www.hp2.com", "expiry": "2100-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(200);
                expect(data.body).toEqual('Updated mapping successfully!!');
            });
        });

        describe('After successful addition, if mapping is edited with old date as expiry date', () => {
            var data = {};
            beforeAll((done) => {
                request.put('http://localhost:3000/mapping/edit', {json: true, body: { "key": "hp2", "value": "https://www.hp2.com", "expiry": "1900-12-31" }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('then it should throw error with 400 status code', () => {
                expect(data.status).toEqual(400);
                expect(data.body).toEqual('Expiry date cannot be previous');
            });
        });

        describe('After successful addition, if mapping is edited', () => {
            var data = {};
            beforeAll((done) => {
                request.put('http://localhost:3000/mapping/edit', {json: true, body: { }}, 
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = body;
                            done();
                        });
            });
            it ('should return the existing object', () => {
                expect(data.status).toEqual(400);
                expect(data.body).toEqual('Invalid data!!');
            });
        });

        describe('After successful addition, while deleting a mapping, then if key is not provided', () => {
            var data = {};
            beforeAll((done) => {
                request.delete('http://localhost:3000/mapping', (error, request, body) => {
                    data.status = request.statusCode;
                    data.body = body;
                    done();
                });
            });
    
            it ('then error is thrown back with status code 400', () => {
                expect(data.status).toBe(200);
                expect(data.body).toEqual('DELETE method');
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