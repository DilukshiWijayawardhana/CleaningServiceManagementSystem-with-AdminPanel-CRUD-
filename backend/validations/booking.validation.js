const Joi = require("joi");

const bookingSchema = Joi.object({
  customerName: Joi.string().min(3).max(50).required(),
  address: Joi.string().min(5).required(),
  dateTime: Joi.date().iso().required(),
  serviceId: Joi.number().integer().required(),
});

module.exports = { bookingSchema };
