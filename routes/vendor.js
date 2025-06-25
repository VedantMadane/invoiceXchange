const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');
// ...existing
router.post('/create-invoice', ensureAuthenticated, ensureRole('vendor'), vendorController.createInvoice);
router.post('/list-for-resale', ensureAuthenticated, ensureRole('vendor'), vendorController.listForResale);
router.get('/dashboard', ensureAuthenticated, ensureRole('vendor'), vendorController.dashboard);

module.exports = router;
