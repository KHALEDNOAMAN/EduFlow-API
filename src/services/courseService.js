const { query } = require('../config/database');
const AppError = require('../utils/AppError');
const { getPaginationParams, formatPaginationMeta } = require('../utils/helpers');

class CourseService {
  static async getAll(queryParams) {
    const { page, perPage, offset } = getPaginationParams(queryParams);
    const { category, difficulty, search } = queryParams;
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (category) { conditions.push(`c.category = $${paramIdx++}`); params.push(category); }
    if (difficulty) { conditions.push(`c.difficulty = $${paramIdx++}`); params.push(difficulty); }
    if (search) { conditions.push(`(c.title ILIKE $${paramIdx++})`); params.push(`%${search}%`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const countResult = await query(`SELECT COUNT(*) FROM courses c ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    const coursesResult = await query(
      `SELECT c.*, u.first_name AS instructor_first, u.last_name AS instructor_last,
        (SELECT COUNT(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
        (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS student_count
       FROM courses c
       LEFT JOIN users u ON c.instructor_id = u.id
       ${where}
       ORDER BY c.created_at DESC
       LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
      [...params, perPage, offset]
    );

    return { courses: coursesResult.rows, pagination: formatPaginationMeta(page, perPage, total) };
  }

  static async getById(id) {
    const result = await query(
      `SELECT c.*, u.first_name AS instructor_first, u.last_name AS instructor_last
       FROM courses c LEFT JOIN users u ON c.instructor_id = u.id WHERE c.id = $1`, [id]
    );
    if (result.rows.length === 0) throw new AppError('Course not found', 404, 'NOT_FOUND');

    const lessons = await query(
      'SELECT id, title, order_index, duration_minutes FROM lessons WHERE course_id = $1 ORDER BY order_index', [id]
    );

    return { ...result.rows[0], lessons: lessons.rows };
  }

  static async create(data, instructorId) {
    const result = await query(
      `INSERT INTO courses (title, description, category, difficulty, price, is_published, instructor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [data.title, data.description, data.category, data.difficulty, data.price || 0, data.isPublished || false, instructorId]
    );
    return result.rows[0];
  }

  static async update(id, data, userId) {
    const existing = await query('SELECT instructor_id FROM courses WHERE id = $1', [id]);
    if (existing.rows.length === 0) throw new AppError('Course not found', 404, 'NOT_FOUND');

    const fields = [];
    const values = [];
    let idx = 1;

    if (data.title) { fields.push(`title = $${idx++}`); values.push(data.title); }
    if (data.description) { fields.push(`description = $${idx++}`); values.push(data.description); }
    if (data.category) { fields.push(`category = $${idx++}`); values.push(data.category); }
    if (data.difficulty) { fields.push(`difficulty = $${idx++}`); values.push(data.difficulty); }
    if (data.price !== undefined) { fields.push(`price = $${idx++}`); values.push(data.price); }
    if (data.isPublished !== undefined) { fields.push(`is_published = $${idx++}`); values.push(data.isPublished); }

    if (fields.length === 0) throw new AppError('No fields to update', 400, 'NO_FIELDS');
    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE courses SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM courses WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) throw new AppError('Course not found', 404, 'NOT_FOUND');
    return { message: 'Course deleted successfully' };
  }
}

module.exports = CourseService;
