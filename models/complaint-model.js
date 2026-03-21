const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaint:  { type: String, required: true },
    department: String,
    category:   String,
    priority:   { type: String, enum: ['Low', 'Medium', 'High'] },
    summary:    String,
    lat:        Number,
    lng:        Number,
    ticketId:   String,
    status:     { type: String, default: 'Submitted' }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);