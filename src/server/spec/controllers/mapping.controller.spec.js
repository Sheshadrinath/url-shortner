var request = require('request');

describe('Server ', () => {
    var server;
    beforeAll(() => {
        server = require('../../app');
    });

    describe('When get all mappings method is invoked, then', () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:3000/url/urls", (error, request, body) => {
                data.status = request.statusCode;
                data.body = JSON.parse(body);
                done();     //This along with above done in beforeAll is required, since these calls are async in nature.
            });
        });
        it('response code should be 200', () => {
            expect(data.status).toBe(200);
        });
        it('response body should contain JSON data with at least one mapping', () => {
            expect(data.body.length).toBeGreaterThan(0);
        });
    });

    describe('When get a mapping is invoked, with', () => {
        var data = {};
        describe('wrong request, then', () => {
            beforeAll((done) => {
                request.get('http://localhost:3000/url', (error, request, body) => {
                    data.status = request.statusCode;
                    done();
                });
            });
            
            it ('should return 404 error code', () => {
                expect(data.status).toBe(404);
            })
        });

        describe('correct request, then', () => {
            beforeAll((done) => {
                request.get('http://localhost:3000/url/google', (error, request, body) => {
                    data.status = request.statusCode;
                    data.body = JSON.parse(body);
                    done();
                });
            });

            it ('should return valid status code 200', () => {
                expect(data.status).toBe(200);
            });

            it('should return requested mapping', () => {
                expect(data.body.key).toEqual('google');
                expect(data.body.value).not.toBeNull();
            });
        });

        describe('correct request with mapping which does not exist, then', () => {
            beforeAll((done) => {
                request.get('http://localhost:3000/url/example', (error, request, body) => {
                    data.status = request.statusCode;
                    data.body = body;
                    done();
                });
            });

            it ('should return valid status code 200', () => {
                expect(data.status).toBe(200);
            });

            it('should return requested mapping', () => {
                expect(data.status).toBe(200);
                expect(data.body).toEqual('Mapping not found');
            });
        });
    });
});