const express = require('express');
const router = express.Router();
const purchaserController = require('../controllers/purchaserController');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

router.get('/dashboard', ensureAuthenticated, ensureRole('purchaser'), purchaserController.dashboard);
// ...existing
router.get('/resale-market', ensureAuthenticated, ensureRole('purchaser'), purchaseController.listResaleInvoices);
router.post('/buy-invoice', ensureAuthenticated, ensureRole('purchaser'), purchaseController.buyInvoice);
module.exports = router;
