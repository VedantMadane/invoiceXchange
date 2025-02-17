const express = require('express');
const router = express.Router();
const purchaserController = require('../controllers/purchaserController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, ensureRole('purchaser'), purchaserController.dashboard);

module.exports = router;
