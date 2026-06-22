exports.up = function(knex) {
  return knex.schema.createTable('lessons', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('course_id').notNullable().references('id').inTable('courses').onDelete('CASCADE');
    table.string('title', 200).notNullable();
    table.text('content');
    table.string('video_url', 500);
    table.integer('order_index').notNullable().defaultTo(0);
    table.integer('duration_minutes').notNullable().defaultTo(30);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('lessons');
};
