const { query } = require('../config/database');
const AppError = require('../utils/AppError');
const { formatResponse } = require('../utils/helpers');

class EnrollmentController {
  static async enroll(req, res, next) {
    try {
      const { courseId } = req.body;
      const userId = req.user.id;

      const existing = await query(
        'SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2', [userId, courseId]
      );
      if (existing.rows.length > 0) {
        throw new AppError('You are already enrolled in this course', 409, 'ALREADY_ENROLLED');
      }

      const result = await query(
        `INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)
         RETURNING id, user_id, course_id, progress, enrolled_at`,
        [userId, courseId]
      );
      res.status(201).json(formatResponse(result.rows[0]));
    } catch (error) { next(error); }
  }

  static async getMyEnrollments(req, res, next) {
    try {
      const result = await query(
        `SELECT e.*, c.title AS course_title, c.category, c.difficulty,
          u.first_name AS instructor_first, u.last_name AS instructor_last
         FROM enrollments e
         JOIN courses c ON e.course_id = c.id
         LEFT JOIN users u ON c.instructor_id = u.id
         WHERE e.user_id = $1 ORDER BY e.enrolled_at DESC`,
        [req.user.id]
      );
      res.json(formatResponse(result.rows));
    } catch (error) { next(error); }
  }

  static async unenroll(req, res, next) {
    try {
      const result = await query(
        'DELETE FROM enrollments WHERE id = $1 AND user_id = $2 RETURNING id',
        [req.params.id, req.user.id]
      );
      if (result.rows.length === 0) throw new AppError('Enrollment not found', 404);
      res.json(formatResponse({ message: 'Successfully unenrolled from course' }));
    } catch (error) { next(error); }
  }
}

module.exports = EnrollmentController;
