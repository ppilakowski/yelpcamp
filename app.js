//app setup
const express       = require("express"),
      app           = express(),
      ejs           = require("ejs"),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require("passport"),
      LocalStrategy = require("passport-local")
var Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds")
    User            = require("./models/user")


seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

// Passport config
app.use(require("express-session")({
    secret: "Gacek jest gruby",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})


// =============================
// COMMENTS ROUTES
// =============================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments/", isLoggedIn, function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
            //connect new comment to campground
            //redirect to show page of campground
        }
    })

})
//===========
//Auth Routes
//===========
//show register form
app.get("/register", function(req,res){
    res.render("register")
})
//handle sign up logic
app.post("/register", function(req,res){
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function (err, user){
        if(err){
            console.log(err);
            return app.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    })
})

//show login form
app.get("/login", function(req,res){
    res.render("login");
})

//handle login
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
})

// logout route
app.get("/logout", function(req,res){
    req.logOut();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    
    console.log(`Serwer YelpCamp startuje!`);
});