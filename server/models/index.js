const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.Favorite = require("./FavoriteModel");
db.Images = require("./ImagesModel");
db.Items = require("./ItemsModel");
db.Users = require("./UsersModel");
db.Orders = require("./OrdersModel");
module.exports = db;
