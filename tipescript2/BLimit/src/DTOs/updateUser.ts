import Joi from 'joi';

export const updateUser = Joi.object({
  name: Joi.string().trim().empty(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});