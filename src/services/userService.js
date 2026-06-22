const { query } = require('../config/database');
const AppError = require('../utils/AppError');
const { getPaginationParams, formatPaginationMeta } = require('../utils/helpers');

class UserService {
  static async getAll(queryParams) {
    const { page, perPage, offset } = getPaginationParams(queryParams);
    const search = queryParams.search || '';

    let whereClause = '';
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      whereClause = `WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1)`;
    }

    const countResult = await query(`SELECT COUNT(*) FROM users ${whereClause}`, params);
    const total = parseInt(countResult.rows[0].count);

    const usersResult = await query(
      `SELECT id, email, first_name, last_name, role, is_active, created_at
       FROM users ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
      [...params, perPage, offset]
    );

    return {
      users: usersResult.rows,
      pagination: formatPaginationMeta(page, perPage, total),
    };
  }

  static async getById(id) {
    const result = await query(
      'SELECT id, email, first_name, last_name, role, is_active, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      throw new AppError('User not found', 404, 'NOT_FOUND');
    }
    return result.rows[0];
  }

  static async update(id, data) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.firstName) { fields.push(`first_name = $${paramIndex++}`); values.push(data.firstName); }
    if (data.lastName) { fields.push(`last_name = $${paramIndex++}`); values.push(data.lastName); }
    if (data.role) { fields.push(`role = $${paramIndex++}`); values.push(data.role); }
    if (data.isActive !== undefined) { fields.push(`is_active = $${paramIndex++}`); values.push(data.isActive); }

    if (fields.length === 0) throw new AppError('No fields to update', 400, 'NO_FIELDS');

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING id, email, first_name, last_name, role, is_active`,
      values
    );

    if (result.rows.length === 0) throw new AppError('User not found', 404, 'NOT_FOUND');
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) throw new AppError('User not found', 404, 'NOT_FOUND');
    return { message: 'User deleted successfully' };
  }
}

module.exports = UserService;
