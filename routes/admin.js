const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, ensureRole('admin'), adminController.dashboard);

module.exports = router;
