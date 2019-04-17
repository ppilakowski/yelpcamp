const mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {
        name: "Pierwszy",
        image: "https://dascompany.com/render/3-6/arrows/61/opt_S3V6-A055K0A4.png",
        description: "Opis pierwszego campgrounda"
    },
    {
        name: "Drugi",
        image: "https://dascompany.com/uploads/tent/boxes/gates/namiot-magazynowy-otwieranie-3-1.jpg",
        description: "Opis drugiego campgrounda"
    },
    {
        name: "Trzeci",
        image: "https://dascompany.com/uploads/tent/boxes/gates/namiot-magazynowy-otwieranie-3-2.jpg",
        description: "Opis trzeciego campgrounda"
    }
]


// Remove all campgrounds
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        } else {
            console.log("removed campgrounds");
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Campground created")
                    }
                })
            })
        }
    })
    
    
    // add a few comments
}

module.exports = seedDB;