import joi from 'joi';

export const userSchema = joi.object({
  email: joi.string().email().required(),
  name: joi.string().required(),
  password: joi.string().min(6).max(32).required(),
});
