import Joi from 'joi';

// Contraseña segura: al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .message('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');

export const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: passwordSchema.required(),
  securityWord: Joi.string()
    .min(3)
    .max(50)
    .required(),
  securityAnswer: Joi.string()
    .min(2)
    .max(100)
    .required(),
  personalId: Joi.number()
    .integer()
    .positive()
});

export const loginSchema = Joi.object({
  username: Joi.string()
    .required(),
  password: Joi.string()
    .required()
});

export const updateProfileSchema = Joi.object({
  securityWord: Joi.string()
    .min(3)
    .max(50),
  securityAnswer: Joi.string()
    .min(2)
    .max(100)
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required(),
  newPassword: passwordSchema.required()
});