let mongoose = require('mongoose');
let express = require('express');
let app = express();

let Warehouse = require("./models/warehouse");
let Item = require("./models/item");

let url = "mongodb://localhost:27017/warehouseDB";
mongoose.connect(url, function(err){
    if(err){
        throw err;
    }
    console.log("Successfully Connected");
});

//Create Warehouse
app.get('/addwarehouse/:name/:capacity/:address', function(req, res){
    // let wH = new Warehouse({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.params.name,
    //     address: req.params.address,
    //     capacity: req.params.capacity,
    // });

    // wH.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });

    //Create Option 2
    Warehouse.create({
        name: req.params.name,
        address: req.params.address,
        capacity: parseInt(req.params.capacity),
    },
    
    function(err){
            if(err){
                console.log(err);
            }
        res.redirect('/getwarehouse');
    })
});

//Get Warehouse
app.get('/getwarehouse', function(req,res){
    Warehouse.find().exec(function (err, data){
        res.send(data);
    });
});

//Create Items
app.get('/additem/:whId/:name/:cost/:quantity', function (req, res){
    Item.create({
        name: req.params.name,
        cost: req.params.cost,
        quantity: req.params.quantity,
        warehouse: mongoose.Types.ObjectId(req.params.whId),
    }, function(err){
        if(err){
            console.log("Unable to create item");
            
        }
        res.redirect('/getitems');
    })
});

//Get Items
app.get('/getitems', function(req, res){
    Item.find().populate('warehouse').exec(function (err, data){
        data = JSON.stringify(data, null, 4);
        res.send('<pre>${data}</pre>');
    })
});


app.listen(8080);

