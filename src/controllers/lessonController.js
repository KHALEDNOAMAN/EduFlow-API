const { query } = require('../config/database');
const AppError = require('../utils/AppError');
const { formatResponse } = require('../utils/helpers');

class LessonController {
  static async getByCourse(req, res, next) {
    try {
      const result = await query(
        'SELECT * FROM lessons WHERE course_id = $1 ORDER BY order_index', [req.params.courseId]
      );
      res.json(formatResponse(result.rows));
    } catch (error) { next(error); }
  }

  static async create(req, res, next) {
    try {
      const { title, content, videoUrl, orderIndex, durationMinutes } = req.validatedBody || req.body;
      const result = await query(
        `INSERT INTO lessons (course_id, title, content, video_url, order_index, duration_minutes)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [req.params.courseId, title, content, videoUrl || null, orderIndex, durationMinutes]
      );
      res.status(201).json(formatResponse(result.rows[0]));
    } catch (error) { next(error); }
  }

  static async update(req, res, next) {
    try {
      const { title, content, videoUrl, orderIndex, durationMinutes } = req.body;
      const result = await query(
        `UPDATE lessons SET title = COALESCE($1, title), content = COALESCE($2, content),
         video_url = COALESCE($3, video_url), order_index = COALESCE($4, order_index),
         duration_minutes = COALESCE($5, duration_minutes), updated_at = NOW()
         WHERE id = $6 RETURNING *`,
        [title, content, videoUrl, orderIndex, durationMinutes, req.params.id]
      );
      if (result.rows.length === 0) throw new AppError('Lesson not found', 404);
      res.json(formatResponse(result.rows[0]));
    } catch (error) { next(error); }
  }

  static async delete(req, res, next) {
    try {
      const result = await query('DELETE FROM lessons WHERE id = $1 RETURNING id', [req.params.id]);
      if (result.rows.length === 0) throw new AppError('Lesson not found', 404);
      res.json(formatResponse({ message: 'Lesson deleted successfully' }));
    } catch (error) { next(error); }
  }
}

module.exports = LessonController;
