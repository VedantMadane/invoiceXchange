const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, ensureRole('vendor'), vendorController.dashboard);

module.exports = router;
