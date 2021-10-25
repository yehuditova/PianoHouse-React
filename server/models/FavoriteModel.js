const mongoose = require("mongoose");

const Favorite = mongoose.model(
    "Favorite",
    new mongoose.Schema({
           userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
          },
          itemid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Items"
          },
    })
);

module.exports = Favorite;


