var request = require('request');

describe('Server ', () => {
    var server;
    beforeAll(() => {
        server = require('../../app');
    });

    describe('When requested for random key, and if the existing url is sent, then', () => {
        var data = {};
        beforeAll((done) => {
            request.post("http://localhost:3000/random/generate", {json: true, body: { "value": "https://www.apple.com" }}, 
            (error, request, body) => {
                data.status = request.statusCode;
                data.body = body[0];
                done();     //This along with above done in beforeAll is required, since these calls are async in nature.
            });
        });
        it('response code should be 200', () => {
            expect(data.status).toBe(200);
        });
        it('response body should contain existing mapping', () => {
            expect(data.body.key).not.toBeNull();
            expect(data.body.key).not.toBeUndefined();
            expect(data.body.value).toBe('https://www.apple.com');
            expect(data.body.expiry).not.toBeNull();
            expect(data.body.expiry).not.toBeUndefined();
        });
    });

    describe('When requested for random key, and if the url is not present, then', () => {
        var data = {};
        var randomUrl = "https://www." + new Date().getTime().toString() + ".com";
        console.log(randomUrl);
        beforeAll((done) => {
            request.post("http://localhost:3000/random/generate", {json: true, body: { "value": randomUrl }}, 
            (error, request, body) => {
                data.status = request.statusCode;
                data.body = body;
                done();     //This along with above done in beforeAll is required, since these calls are async in nature.
            });
        });
        it('response code should be 200', () => {
            expect(data.status).toBe(200);
        });
        it('response body should return new mapping', () => {
            expect(data.body.key).not.toBeNull();
            expect(data.body.key).not.toBeUndefined();
            expect(data.body.value).toBe(randomUrl);
            expect(data.body.expiry).not.toBeNull();
            expect(data.body.expiry).not.toBeUndefined();
        });
    });
});