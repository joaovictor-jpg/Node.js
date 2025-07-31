import Joi from 'joi';

export const createdUser = Joi.object({
  name: Joi.string().trim().empty().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});