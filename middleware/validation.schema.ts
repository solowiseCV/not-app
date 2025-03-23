import Joi from 'joi';
import { Types } from 'mongoose';

export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  phone: Joi.number().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const noteSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  content: Joi.string().required().min(1),
  category: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('Invalid category ID');
    }
    return value;
  }).required(),
  type: Joi.string().valid('user', 'system').required()
});

export const categorySchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  description: Joi.string().max(200)
}); 