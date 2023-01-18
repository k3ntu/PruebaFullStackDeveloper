const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLib, getAllStub, createStub } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('Services - movies', function () {
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLib
    });

    const moviesService = new MoviesServices();

    describe('when getMovies method is called', async function() {
        it("should call the getAll MongoLib method", async function () {
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });

        it("should return an array of movies", async function() {
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);
        });
    });

    describe('when createMovie method is called', async function() {
        it('should cakk the createMovie MongLib method', async function () {
            await moviesService.createMovie({});
            assert.strictEqual(createStub.called, true);
        });

        it("should return an object of movie", async function () {
            const result = await moviesService.createMovie({});
            const expected = moviesMock[0].id;
            assert.deepEqual(result, expected);
        })
    });
});
