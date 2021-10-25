const db = require("../models");
const Items = db.Items;


exports.create = (req, res) => {
    if (!(req.body.barcode)) {
        return res.status(400).send({
            message: "Barcode can not be empty!"
        });
    }

    const item = new Items({

        company: req.body.company,
        color: req.body.color,
        price: req.body.price,
        image: req.body.image,
        barcode: req.body.barcode
    });

    item.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};


//get item by barcode
exports.findOne = (req, res) => {
    Items.find({barcode:req.query.barcode})
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Item not found with  barcode" + req.query.barcode
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with barcode" + req.query.barcode
            });
        }
        return res.status(500).send({
            message: "Error retrieving Item with barcode" + req.query.barcode
        });
    });

}

//get list items
exports.findAll = (req, res) => {
    Items.find()
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "No items" 
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Items not found"
            });
        }
        return res.status(500).send({
            message: "Error retrieving Items"
        });
    });

}


//get item by id
exports.findById = (req, res) => {
    Items.findById(req.query.id)
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Item not found with  id" + req.query.id
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with user id" + req.query.id
            });
        }
        return res.status(500).send({
            message: "Item retrieving Item withid" + req.query.id
        });
    });

}