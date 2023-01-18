const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, modelFillMovieMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe.only('route - movies', function () {
  const route = proxyquire('../routes/messages.js', {
    '../services/movies': MoviesServiceMock,
  });

  const request = testServer(route);

  describe('GET /movies', () => {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        });

        done();
      });
    });
  });

  describe('GET /movies/:movieId', () => {
    it('should respong with status 200', function (done) {
      const movieId = '5ee97968847e061268f844fd';
      request.get(`/api/movies/${movieId}`).expect(200, done);
    });

    it('should respond with the object of movie', function (done) {
      const movieId = '5ee97968847e061268f844fd';
      request.get(`/api/movies/${movieId}`).end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrieved'
        });

        done();
      });
    });
  });

  describe('POST /movies', () => {
    it('should respong with status 201', function (done) {
      request
        .post('/api/movies')
        .send(modelFillMovieMock())
        .expect(201, done);
    });

    it('should respond with the movie created id', function (done) {
      request
        .post('/api/movies')
        .send(modelFillMovieMock())
        .end((err, res) => {
          assert.deepEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie created'
          });

        done();
      });
    });
  });
});
