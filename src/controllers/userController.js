const UserService = require('../services/userService');
const { formatResponse } = require('../utils/helpers');

class UserController {
  static async getAll(req, res, next) {
    try {
      const result = await UserService.getAll(req.query);
      res.json(formatResponse(result.users, { pagination: result.pagination }));
    } catch (error) { next(error); }
  }

  static async getById(req, res, next) {
    try {
      const user = await UserService.getById(req.params.id);
      res.json(formatResponse(user));
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.json(formatResponse(user));
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const result = await UserService.delete(req.params.id);
      res.json(formatResponse(result));
    } catch (error) { next(error); }
  }
}

module.exports = UserController;
