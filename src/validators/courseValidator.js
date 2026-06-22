const { z } = require('zod');

const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number().min(0, 'Price must be non-negative').optional().default(0),
  isPublished: z.boolean().optional().default(false),
});

const updateCourseSchema = createCourseSchema.partial();

const createLessonSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10).max(50000),
  videoUrl: z.string().url().optional().nullable(),
  orderIndex: z.number().int().min(0),
  durationMinutes: z.number().int().min(1).max(600),
});

module.exports = { createCourseSchema, updateCourseSchema, createLessonSchema };
