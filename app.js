//app setup
const express       = require("express"),
      app           = express(),
      ejs           = require("ejs"),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride= require("method-override");
var   Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      seedDB        = require("./seeds")
      User          = require("./models/user"),
      //require routes
      commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));

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

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
    console.log(`Serwer YelpCamp startuje!`);
});