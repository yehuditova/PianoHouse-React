const db = require("../models");
const Favorite = db.Favorite;

//create user favorite item
exports.create = (req, res) => {
    if (!(req.body.userid)) {
        return res.status(400).send({
            message: "userid can not be empty!"
        });
    }

    const favorite = new Favorite({
        userid: req.body.userid,
        itemid: req.body.itemid,
    });

    favorite.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the favorite."
            });
        });
};


//delete user favorite item
exports.delete = (req, res) => {
    Favorite.findOneAndRemove({
        userid: req.query.userid,
        itemid: req.query.itemid,
    })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "favorite item not found with user id " + req.query.userid
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "favorite item not found with user id " + req.query.userid
                });
            }
            return res.status(500).send({
                message: "Could not delete favorite item with user id " + req.query.userid
            });
        });
};



//get user favorite
exports.findAll = (req, res) => {
    if (!(req.query.userid)) {
        return res.status(400).send({
            message: "userid can not be empty!"
        });
    }

    Favorite.find({ userid: req.query.userid })
    .populate('itemid')
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "No Favorite"
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Favorite not found"
                });
            }
            return res.status(500).send({
                message: "Error retrieving Favorite"
            });
        });

}











//get user favorite Item
exports.findOne = (req, res) => {
    if (!(req.query.userid)) {
        return res.status(400).send({
            message: "userid can not be empty!"
        });
    }

    Favorite.findOne({ userid: req.query.userid,
    itemid:req.query.itemid })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "No Favorite"
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Favorite not found"
                });
            }
            return res.status(500).send({
                message: "Error retrieving Favorite"
            });
        });

}

