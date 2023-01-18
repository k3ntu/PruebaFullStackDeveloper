const Joi = require('@hapi/joi');

const certificateIdSchema =             Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const certificateUserIdSchema =         Joi.string();
const certificateCourseIdSchema =       Joi.string();
const certificateVideosSchema =         Joi.array().items(Joi.object());
const certificatePromotionsSchema =     Joi.array().items(Joi.object());

const createCertificateSchema = {
  user_id: certificateUserIdSchema.required(),
  course_id: certificateCourseIdSchema.required(),
  videos: certificateVideosSchema.required(),
  promotions: certificatePromotionsSchema
};

const updateCertificateSchema = {
  user_id: certificateUserIdSchema.required(),
  course_id: certificateCourseIdSchema.required(),
  videos: certificateVideosSchema.required(),
  promotions: certificatePromotionsSchema
};

module.exports = {
  certificateIdSchema,
  createCertificateSchema: createCertificateSchema,
     updateCertificateSchema: updateCertificateSchema,
};
