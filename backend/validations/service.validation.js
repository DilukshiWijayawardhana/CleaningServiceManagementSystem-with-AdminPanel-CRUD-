const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { serviceSchema };
