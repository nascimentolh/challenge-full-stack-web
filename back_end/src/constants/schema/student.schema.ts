import joi from 'joi';

export const createStudent = joi.object({
  ra: joi.number().positive().required(),
  cpf: joi.string().min(11).max(11).required(),
  name: joi.string().min(3).max(70).required(),
  email: joi.string().email().required(),
});
