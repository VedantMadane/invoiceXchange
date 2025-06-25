const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, ensureRole('admin'), adminController.dashboard);
// ...existing
router.get('/resale-requests', ensureAuthenticated, ensureRole('admin'), adminController.viewResaleRequests);
router.post('/approve-resale', ensureAuthenticated, ensureRole('admin'), adminController.approveResale);
router.post('/reject-resale', ensureAuthenticated, ensureRole('admin'), adminController.rejectResale);
module.exports = router;
