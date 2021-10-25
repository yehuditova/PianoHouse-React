const db = require("../models");
const Orders = db.Orders;


exports.create = (req, res) => {
    if (!(req.body.userid)) {
        return res.status(400).send({
            message: "Order userId can not be empty!"
        });
    }

    const order = new Orders({
        userid: req.body.userid,
        date:  req.body.date,
        price:  req.body.price,
        barcode:  req.body.barcode,
        company:  req.body.company,
        color:  req.body.color,
        image:  req.body.image,
        id:  req.body.id
    });

    order.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

//get order by user id
exports.findAll = (req, res) => {
    Orders.find({userid:req.query.userid})
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Order not found with user id" + req.query.userid
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with user id" + req.query.userid
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order with user id" + req.query.userid
        });
    });

}


