const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Set when sold
    amount: { type: Number, required: true },
    status: { type: String, enum: ['created', 'pending_resale', 'resale_approved', 'sold'], default: 'created' },
    resaleAmount: { type: Number }, // 97% of amount when listed for resale
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
