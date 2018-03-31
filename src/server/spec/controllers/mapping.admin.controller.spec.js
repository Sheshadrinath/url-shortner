var request = require('request');

describe('Server', () => {
    var server = null;
    beforeAll(() => {
        server = require('../../app');
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
    });

    describe('While deleting a new mapping,', () => {
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