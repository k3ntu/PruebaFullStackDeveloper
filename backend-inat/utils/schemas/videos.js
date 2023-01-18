const Joi = require('@hapi/joi')
  .extend(require('@hapi/joi-date'));

const videoIdSchema =                 Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const videoThemeIdTitleSchema =       Joi.string();
const videoNameSchema =               Joi.string().max(250);
const videoDescriptionSchema =        Joi.string();
const videoDateSchema =               Joi.date().format('YYYY-MM-DD');
const videoUrlSchema =                Joi.string();
const videoHoursSchema =              Joi.number().integer().default(() => 2);
const videoResourcesSchema =          Joi.array().items(Joi.string());

const createVideoSchema = {
  theme_id: videoThemeIdTitleSchema.required(),
  name: videoNameSchema.required(),
  description: videoDescriptionSchema.required(),
  date: videoDateSchema.required(),
  url: videoUrlSchema.required(),
  hours: videoHoursSchema.required(),
  resources: videoResourcesSchema
};

const updateVideoSchema = {
  theme_id: videoThemeIdTitleSchema.required(),
  name: videoNameSchema.required(),
  description: videoDescriptionSchema.required(),
  date: videoDateSchema.required(),
  url: videoUrlSchema.required(),
  hours: videoHoursSchema.required(),
  resources: videoResourcesSchema
};

module.exports = {
  videoIdSchema,
  createVideoSchema,
  updateVideoSchema
}
