const db = require("../models");
const Images = db.Images;

//create user image
exports.create = (req, res) => {
    if (!(req.body.userid)) {
        return res.status(400).send({
            message: "userid can not be empty!"
        });
    }

    const image = new Images({
        userid: req.body.userid,
        data_url: req.body.data_url,
    });

    image.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the image."
            });
        });
};


//delete user image
exports.delete = (req, res) => {
    Images.findByIdAndRemove(req.body.id)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Images not found with user id " + req.body.userid
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Images not found with user id " + req.body.userid
                });
            }
            return res.status(500).send({
                message: "Could not deleteImages with user id " + req.body.userid
            });
        });
};


//find user images (and then delete)
exports.findAll = (req, res) => {
    if (!(req.query.userid)) {
        return res.status(400).send({
            message: "userid can not be empty!"
        });
    }

    Images.find({userid:req.query.userid})
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "No Images" 
            });
        }
        res.send(note);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Images not found"
            });
        }
        return res.status(500).send({
            message: "Error retrieving Images"
        });
    });

}



