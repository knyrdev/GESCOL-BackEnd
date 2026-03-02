import { unprocessable } from "../utils/AppError.js"

/**
 * Higher-order middleware to validate request data using Joi schemas.
 * 
 * @param {import('joi').ObjectSchema} schema - The Joi schema to validate against.
 * @param {Object} options - Validation options.
 * @param {string} [options.source='body'] - The part of the request to validate ('body', 'query', 'params').
 * @param {boolean} [options.allowUnknown=false] - Whether to allow unknown keys.
 * @param {boolean} [options.stripUnknown=true] - Whether to remove unknown keys from the validated object.
 */
export default (schema, options = {}) => {
  return (req, res, next) => {
    const source = options.source || 'body';
    const data = req[source]; // More idiomatic: body, query, or params

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: options.allowUnknown || false,
      stripUnknown: options.stripUnknown || true
    });

    if (error) {
      const formattedMessage = error.details
        .map(detail => detail.message.replace(/"/g, ''))
        .join(', ');

      return next(unprocessable(`Validation failed: ${formattedMessage}`));
    }

    // Assign validated values to a specific property to prevent using unvalidated data
    req.validated = value;
    next();
  };
};