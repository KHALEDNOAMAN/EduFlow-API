const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  await knex('enrollments').del();
  await knex('lessons').del();
  await knex('courses').del();
  await knex('users').del();

  const hash = await bcrypt.hash('Password123', 12);

  await knex('users').insert([
    { id: uuidv4(), email: 'admin@eduflow.com', password_hash: hash, first_name: 'Khaled', last_name: 'Noaman', role: 'admin' },
    { id: uuidv4(), email: 'instructor1@eduflow.com', password_hash: hash, first_name: 'Ahmet', last_name: 'Yilmaz', role: 'instructor' },
    { id: uuidv4(), email: 'instructor2@eduflow.com', password_hash: hash, first_name: 'Elif', last_name: 'Demir', role: 'instructor' },
    { id: uuidv4(), email: 'student1@eduflow.com', password_hash: hash, first_name: 'Mehmet', last_name: 'Kaya', role: 'student' },
    { id: uuidv4(), email: 'student2@eduflow.com', password_hash: hash, first_name: 'Fatma', last_name: 'Celik', role: 'student' },
    { id: uuidv4(), email: 'student3@eduflow.com', password_hash: hash, first_name: 'Ayse', last_name: 'Ozturk', role: 'student' },
    { id: uuidv4(), email: 'student4@eduflow.com', password_hash: hash, first_name: 'Emre', last_name: 'Sahin', role: 'student' },
    { id: uuidv4(), email: 'student5@eduflow.com', password_hash: hash, first_name: 'Zeynep', last_name: 'Arslan', role: 'student' },
  ]);
};
