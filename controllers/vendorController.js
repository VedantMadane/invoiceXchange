const Invoice = require('../models/Invoice');

// Vendor dashboard
exports.dashboard = (req, res) => {
    res.render('dashboardVendor', { user: req.session.user });
};

exports.createInvoice = async (req, res) => {
    const { amount } = req.body;
    try {
        const invoice = new Invoice({
            vendor: req.session.user.id,
            amount
        });
        await invoice.save();
        res.redirect('/vendor/dashboard');
    } catch (err) {
        res.status(500).send('Error creating invoice');
    }
};

// List invoice for resale with 3% deduction and pending admin approval
exports.listForResale1 = async (req, res) => {
    const { invoiceId } = req.body;
    try {
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice || invoice.vendor.toString() !== req.session.user.id) {
            return res.status(403).send('Not authorized');
        }
        if (invoice.status !== 'created') {
            return res.status(400).send('Invoice not eligible for resale');
        }
        // Deduct 3%
        invoice.resaleAmount = Math.round(invoice.amount * 0.97 * 100) / 100;
        invoice.status = 'pending_resale';
        await invoice.save();
        res.redirect('/vendor/dashboard');
    } catch (err) {
        res.status(500).send('Error listing for resale');
    }
};
