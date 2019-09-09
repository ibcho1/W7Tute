let mongoose = require('mongoose');

let warehouseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: String,
    capacity: {
        type: Number,
        min: 200,
        max: 500
    }
})

let wareHouseModel = mongoose.model('Warehouse', warehouseSchema);
module.exports = wareHouseModel;