const AppError = require('../utils/AppError');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errors = result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return next(new AppError('Validation failed', 400, 'VALIDATION_ERROR'));
      }
      req.validatedBody = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
