exports.up = function(knex) {
  return knex.schema.createTable('courses', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('title', 200).notNullable();
    table.text('description');
    table.uuid('instructor_id').references('id').inTable('users').onDelete('SET NULL');
    table.string('category', 100).notNullable();
    table.enu('difficulty', ['beginner', 'intermediate', 'advanced']).defaultTo('beginner');
    table.decimal('price', 10, 2).defaultTo(0);
    table.boolean('is_published').defaultTo(false);
    table.string('thumbnail_url', 500);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('courses');
};
