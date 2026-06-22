const AuthService = require('../services/authService');
const { formatResponse } = require('../utils/helpers');

class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.validatedBody || req.body);
      res.status(201).json(formatResponse(result));
    } catch (error) { next(error); }
  }

  static async login(req, res, next) {
    try {
      const result = await AuthService.login(req.validatedBody || req.body);
      res.json(formatResponse(result));
    } catch (error) { next(error); }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await AuthService.getProfile(req.user.id);
      res.json(formatResponse(user));
    } catch (error) { next(error); }
  }
}

module.exports = AuthController;
