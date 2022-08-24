const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer(); //esto se usaba antes cuando solo se mandaba el id de la tabala usuario
const email = Joi.string().email();
const password = Joi.string();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  // userId: userId,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
