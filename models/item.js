let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name: String,
    cost: Number,
    quantity: {
        type: Number,
        min: 0
    },
    warehouse:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    },
    created:{
        type: Date,
        default: Date.now
    }
})

let ItemModel = mongoose.model('Item', itemSchema);
module.exports = ItemModel;
