//app setup
const express    = require("express");
const app        = express();
const ejs        = require("ejs");
const bodyParser = require('body-parser')
const mongoose   = require('mongoose');
var Campground   = require("./models/campground");
var seedDB       = require("./seeds")


seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




//ROUTES
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds from the DB
    Campground.find({},function(err, allCampgrounds){ //on this line app.js uses mongo command "find" on Campground variable, which is a model. It returns error or data. Data (called allCampgrounds) are then used to render campgrounds from DB.
        if(err){
            console.log("Mamy babola!!!");
            console.log(err)
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res){
    //get data and add to data array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("Mamy babola!!!");
            console.log(err)
        } else {
            //redirect to campgrounds page

            res.redirect("campgrounds");
        }
    })
    
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
})


//SHOW - show page with more info about a campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})


app.listen(3000, function(){
    
    console.log(`Serwer YelpCamp startuje!`);
});