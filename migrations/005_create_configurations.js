exports.up = function(knex) {
  return knex.schema.createTable('configurations', (table) => {
    table.increments('id').primary();
    table.string('key', 100).notNullable().unique();
    table.text('value');
    table.text('description');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('configurations');
};
