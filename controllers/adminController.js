const Invoice = require('../models/Invoice');

// Existing dashboard...

exports.viewResaleRequests = async (req, res) => {
    const requests = await Invoice.find({ status: 'pending_resale' }).populate('vendor');
    res.render('resaleRequests', { requests });
};

exports.approveResale = async (req, res) => {
    const { invoiceId } = req.body;
    await Invoice.findByIdAndUpdate(invoiceId, { status: 'resale_approved' });
    res.redirect('/admin/resale-requests');
};

exports.rejectResale = async (req, res) => {
    const { invoiceId } = req.body;
    await Invoice.findByIdAndUpdate(invoiceId, { status: 'created', resaleAmount: null });
    res.redirect('/admin/resale-requests');
};
