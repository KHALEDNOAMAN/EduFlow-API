const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/enrollmentController');
const authenticate = require('../middleware/auth');

router.post('/', authenticate, EnrollmentController.enroll);
router.get('/my', authenticate, EnrollmentController.getMyEnrollments);
router.delete('/:id', authenticate, EnrollmentController.unenroll);

module.exports = router;
