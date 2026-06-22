exports.up = function(knex) {
  return knex.schema.createTable('enrollments', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('course_id').notNullable().references('id').inTable('courses').onDelete('CASCADE');
    table.decimal('progress', 5, 2).defaultTo(0);
    table.timestamp('enrolled_at').defaultTo(knex.fn.now());
    table.timestamp('completed_at');
    table.unique(['user_id', 'course_id']);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('enrollments');
};
