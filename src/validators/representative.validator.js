import Joi from 'joi';

export const createRepresentativeSchema = Joi.object({
  ci: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  telephoneNumber: Joi.string().required(),
  email: Joi.string().email().allow(null, ''),
  maritalStat: Joi.string().allow(null, ''),
  profesion: Joi.string().allow(null, ''),
  birthday: Joi.date().iso().allow(null, ''),
  telephoneHouse: Joi.string().allow(null, ''),
  roomAdress: Joi.string().allow(null, ''),
  workPlace: Joi.string().allow(null, ''),
  jobNumber: Joi.string().allow(null, '')
});

export const updateRepresentativeSchema = Joi.object({
  name: Joi.string(),
  lastName: Joi.string(),
  telephoneNumber: Joi.string(),
  email: Joi.string().email().allow(null, ''),
  maritalStat: Joi.string().allow(null, ''),
  profesion: Joi.string().allow(null, ''),
  birthday: Joi.date().iso().allow(null, ''),
  telephoneHouse: Joi.string().allow(null, ''),
  roomAdress: Joi.string().allow(null, ''),
  workPlace: Joi.string().allow(null, ''),
  jobNumber: Joi.string().allow(null, '')
}).min(1);
