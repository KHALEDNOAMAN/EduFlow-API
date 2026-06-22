const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/roleMiddleware');

router.get('/', authenticate, authorize('admin'), UserController.getAll);
router.get('/:id', authenticate, authorize('admin'), UserController.getById);
router.put('/:id', authenticate, authorize('admin'), UserController.update);
router.delete('/:id', authenticate, authorize('admin'), UserController.delete);

module.exports = router;
