const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/lessonController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/roleMiddleware');

router.get('/courses/:courseId/lessons', LessonController.getByCourse);
router.post('/courses/:courseId/lessons', authenticate, authorize('instructor', 'admin'), LessonController.create);
router.put('/:id', authenticate, authorize('instructor', 'admin'), LessonController.update);
router.delete('/:id', authenticate, authorize('admin'), LessonController.delete);

module.exports = router;
