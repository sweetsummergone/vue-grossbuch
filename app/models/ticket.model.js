const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    name: String,
    items: [{
        id: Number,
        name: String,
        price: Number
    }],
});

module.exports = mongoose.model('Ticket', TicketSchema);
