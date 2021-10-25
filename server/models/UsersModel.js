const mongoose = require("mongoose");

const Users = mongoose.model(
    "Users",
    new mongoose.Schema({
        fname: String,
        lname: String,
        email: String,
        phone: Number,
        address: String,
        city: String,
        postalCode: Number,
        password: String,

    })
);

module.exports = Users;
