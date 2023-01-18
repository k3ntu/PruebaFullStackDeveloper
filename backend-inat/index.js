const express = require('express');

const app = express();

const { config } = require('./config');
const usersApi = require('./routes/users');
const videosApi = require('./routes/videos');
const certificatesApi = require('./routes/certificates');

const {
  logErrors,
  wrapError,
  errorHandler,
} = require('./utils/middlewares/errorHandler');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const cors = require('cors');

// body parser
app.use(express.json());
app.use(cors());

// With me
usersApi(app);
videosApi(app);
certificatesApi(app);

// Catch 404
app.use(notFoundHandler);

// Los middlewares de error deben de ir siempre al final de todas las rutas =
// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  if (config.dev) {
    console.log(`Listening http://localhost:${config.port}`);
  }
});
