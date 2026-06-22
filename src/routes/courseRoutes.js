const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/roleMiddleware');
const validate = require('../middleware/validate');
const { createCourseSchema, updateCourseSchema } = require('../validators/courseValidator');

router.get('/', CourseController.getAll);
router.get('/:id', CourseController.getById);
router.post('/', authenticate, authorize('instructor', 'admin'), validate(createCourseSchema), CourseController.create);
router.put('/:id', authenticate, authorize('instructor', 'admin'), validate(updateCourseSchema), CourseController.update);
router.delete('/:id', authenticate, authorize('admin'), CourseController.delete);

module.exports = router;
