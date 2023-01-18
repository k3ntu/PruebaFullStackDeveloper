const Joi = require('@hapi/joi');

const userIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = Joi.string().max(80);
const userPasswordSchema = Joi.string().max(80);
const userMineSchema = Joi.string().max(80);

const createUserSchema = {
  name: userNameSchema.required(),
  password: userPasswordSchema,
  mine: userMineSchema.required(),
};

const updateUserSchema = {
  name: userNameSchema.required(),
  password: userPasswordSchema,
  mine: userMineSchema.required(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
};
