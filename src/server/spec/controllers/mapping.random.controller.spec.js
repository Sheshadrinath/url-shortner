var request = require('request');

describe('Server ', () => {
    var server;
    beforeAll(() => {
        server = require('../../app');
    });

    describe('When requested for random key, then', () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/random/generate", (error, request, body) => {
                data.status = request.statusCode;
                data.body = body;
                done();     //This along with above done in beforeAll is required, since these calls are async in nature.
            });
        });
        it('response code should be 200', () => {
            expect(data.status).toBe(200);
        });
        it('response body should contain random text with 12 characters', () => {
            expect(data.body.length).toBe(12);
        });
    });
});