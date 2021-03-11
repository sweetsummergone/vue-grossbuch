module.exports = function(app) {

    let customers = require('../controllers/customer.controller.js');

	// Create a new Customer
    app.post('/api/ticket', customers.create);

    // Retrieve all Customer
    app.get('/api/tickets', customers.findAll);

    // Retrieve a single Customer by Id
    app.get('/api/ticket/:ticketId', customers.findOne);

    // Update a Customer with Id
    app.put('/api/ticket/:ticketId', customers.update);

	// Retrieve Customers Age
    app.get('/api/tickets/price/:price', customers.findByAge);

    // Delete a Customer with Id
    app.delete('/api/ticket/:ticketId', customers.delete);
}
