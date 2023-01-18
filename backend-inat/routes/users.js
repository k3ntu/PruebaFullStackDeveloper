const express = require('express');
const UsersService = require('../services/users');

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
} = require('../utils/schemas/users');

const validationHandler = require('../utils/middlewares/validationHandler');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;

    try {
      const users = await usersService.doLogin(username, password);

      if (users.length > 0) {
        res.status(200).json({
          data: users,
          message: 'user logged in successfully',
        });
      } else {
        res.status(401).json({
          data: null,
          message: 'user not found or credentials invalid'
        });
      }

      
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async function (req, res, next) {
    let { data } = req.query;

    try {
      const users = await usersService.getUsers({ data });

      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const users = await usersService.getUser({ userId });

        res.status(200).json({
          data: users,
          message: 'user retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Create
  router.post('/', validationHandler(createUserSchema), async function (
    req,
    res,
    next
  ) {
    const { body: user } = req;

    try {
      const createUserId = await usersService.createUser({ user });

      res.status(201).json({
        data: createUserId,
        message: 'user created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    async function (req, res, next) {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        const updateUserId = await usersService.updateUser({
          userId,
          user,
        });

        res.status(200).json({
          data: updateUserId,
          message: 'user updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const deleteUserId = await usersService.deleteUser({ userId });

        res.status(200).json({
          data: deleteUserId,
          message: 'user deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usersApi;
