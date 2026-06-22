const CourseService = require('../services/courseService');
const { formatResponse } = require('../utils/helpers');

class CourseController {
  static async getAll(req, res, next) {
    try {
      const result = await CourseService.getAll(req.query);
      res.json(formatResponse(result.courses, { pagination: result.pagination }));
    } catch (error) { next(error); }
  }

  static async getById(req, res, next) {
    try {
      const course = await CourseService.getById(req.params.id);
      res.json(formatResponse(course));
    } catch (error) { next(error); }
  }

  static async create(req, res, next) {
    try {
      const course = await CourseService.create(req.validatedBody || req.body, req.user.id);
      res.status(201).json(formatResponse(course));
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      const course = await CourseService.update(req.params.id, req.validatedBody || req.body, req.user.id);
      res.json(formatResponse(course));
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const result = await CourseService.delete(req.params.id);
      res.json(formatResponse(result));
    } catch (error) { next(error); }
  }
}

module.exports = CourseController;
