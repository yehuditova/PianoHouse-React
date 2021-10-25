const mongoose = require("mongoose");

const Items = mongoose.model(
    "Items",
    new mongoose.Schema({
        company: String,
        color: String,
        price: Number,
        image: String,
        barcode: Number
    })
);

module.exports = Items;
