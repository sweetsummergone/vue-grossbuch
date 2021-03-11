const Customer = require('../models/ticket.model.js');


// POST a Customer
exports.create = (req, res) => {
    // Create a Customer
    console.log(req.body)
    const customer = new Customer({
        name: req.body[0],
        items: req.body.slice(1,req.body.length)
    })
    console.log(customer)
    // Save a Customer in the MongoDB
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FETCH all Customers
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// FIND a Customer
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.customerId
        });
    });
};

exports.findByAge = (req, res) => {
	Customer.find({ age: req.params.age})
			.then(
				customers => {
					res.send(customers)
				}
			)
			.catch(err => {
				res.status(500).send("Error -> " + err);
			})
}

// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    Customer.findOneAndUpdate({ _id: req.params.customerId }, {
        name: req.body.name,
		age: req.body.age,
		active: req.body.active
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

// DELETE a Customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};
