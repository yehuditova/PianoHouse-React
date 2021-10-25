const mongoose = require("mongoose");

const Orders = mongoose.model(
    "Orders",
    new mongoose.Schema({
        userid: Number,
        date: Number,
        price: Number,
        barcode: Number,
        company: String,
        color: String,
        image: String,
    })
);

module.exports = Orders;










