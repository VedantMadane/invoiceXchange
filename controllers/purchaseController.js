const Invoice = require('../models/Invoice');

// Existing dashboard...

exports.listResaleInvoices = async (req, res) => {
    const invoices = await Invoice.find({ status: 'resale_approved' }).populate('vendor');
    res.render('resaleMarket', { invoices });
};

exports.buyInvoice = async (req, res) => {
    const { invoiceId } = req.body;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice || invoice.status !== 'resale_approved') {
        return res.status(400).send('Invoice not available');
    }
    invoice.status = 'sold';
    invoice.purchaser = req.session.user.id;
    await invoice.save();
    res.redirect('/purchaser/dashboard');
};
