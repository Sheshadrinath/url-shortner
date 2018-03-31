var request = require('request');

describe('Server', () => {
    var server = null;
    beforeAll(() => {
        server = require('../../app');
    });

    describe('While deleting a new mapping,', () => {
        var data = {};
        beforeAll((done) => {
            request.delete('http://localhost:3000/mapping/hp1', (error, request, body) => {
                data.status = request.statusCode;
                data.response = body;
                done();
            });
        });

        it ('should throw error if mapping does not exists by returning 500 error', () => {
            expect(data.status).toBe(500);
        });
    });
});