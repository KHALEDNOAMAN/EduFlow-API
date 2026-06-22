module.exports = {
  SALT_ROUNDS: 12,
  TOKEN_EXPIRY: process.env.JWT_EXPIRY || '24h',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  ROLES: {
    ADMIN: 'admin',
    INSTRUCTOR: 'instructor',
    STUDENT: 'student',
  },
  DIFFICULTY_LEVELS: ['beginner', 'intermediate', 'advanced'],
  COURSE_CATEGORIES: [
    'Mathematics', 'Science', 'Language', 'Technology',
    'Arts', 'Business', 'Health', 'Social Studies',
  ],
};
