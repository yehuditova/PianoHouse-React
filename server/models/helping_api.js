Users=
{
    fname: String,
    lname: String,
    email: String,
    phone: Number,
    address: String,
    city: String,
    postalCode: Number,
    password: String,

};

Items={
    company: String,
    color: String,
    price: Number,
    image: String,
    barcode: Number
}

Favorite={
    userid: ObjectId,
    itemid: ObjectId,
}

Images={
    userid: ObjectId,
    data_url:String
}

Orders={
    userid: Number,
    date: Number,
    price: Number,
    barcode: Number,
    company: String,
    color: String,
    image: String,
}