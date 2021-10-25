const mongoose = require("mongoose");

const Images = mongoose.model(
    "Images",
    new mongoose.Schema({
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
          },
        data_url:String
    })
);

module.exports = Images;


