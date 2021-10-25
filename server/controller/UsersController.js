const db = require("../models");
const Users = db.Users;





//get user by email and password
exports.findOne = (req, res) => {
    Users.find({
        email: req.query.email,
        password: req.query.password
    })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "User not found with email: " + req.query.email+" and password:"+req.query.password
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with email: " + req.query.email+" and password:"+req.query.password
                });
            }
            return res.status(500).send({
                message: "Error retrieving User email: " + req.query.email+" and password:"+req.query.password
            });
        });

}

//get user by email
exports.find = (req, res) => {
    Users.find({
        email: req.query.email
    })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "User not found with email: " + req.query.email
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with email: " + req.query.email
                });
            }
            return res.status(500).send({
                message: "Error retrieving User email: " + req.query.email
            });
        });

}

//create user
exports.create = (req, res) => {
    if (!(req.body.fname)) {
        return res.status(400).send({
            message: "fname can not be empty!"
        });
    }

    const user = new Users({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        password: req.body.password
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};


//update user
exports.findAndUpdate = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "email content can not be empty"
        });
    }
    Users.updateOne({email:req.body.email}, {
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        password: req.body.password
    })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "User not found "
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            return res.status(500).send({
                message: "Error updating User"
            });
        });
};

