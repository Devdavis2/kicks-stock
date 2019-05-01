const mongoose = require('mongoose');

const kicksSchema = new mongoose.Schema({


    productname: { type: String, required: true },
    description: { type: String, required: true },
    img: {type:String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    deadStock: Boolean
});

const Kicks = mongoose.model('Kicks', kicksSchema);

module.exports = Kicks;




