const mongoose = require('mongoose');

const kicksSchema = new mongoose.Schema({

    productname: { type: String, required: true },
    description: { type: String, required: true },
    // newOrUsed: { type: String, required: true },
    inStock: Boolean
});

const Kicks = mongoose.model('Kicks', kicksSchema);

module.exports = Kicks;