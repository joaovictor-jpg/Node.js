import Joi from 'joi';

export const loginUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});