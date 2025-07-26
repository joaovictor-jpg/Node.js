import Joi from 'joi';

export const schemaName = Joi.object({
  name: Joi.string().trim().empty().required()
});