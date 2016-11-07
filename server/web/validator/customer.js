import Joi from 'joi';

export default {
  createCustomer: {
    body: {
      username: Joi.string().require(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).require()
    }
  },

  updateCustomer: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).require()
    },
    params: {
      customerId: Joi.string().hex().required()
    }
  },

  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};

