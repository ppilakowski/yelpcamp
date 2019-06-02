var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ornare ante. Donec feugiat quam nec felis tempor venenatis. In tempor suscipit nunc, sed iaculis magna vehicula vel. In scelerisque tellus quis mi hendrerit cursus. Quisque congue, ex id pellentesque placerat, risus enim fringilla orci, sit amet pharetra tortor arcu et justo. Sed turpis metus, iaculis tristique feugiat ut, mollis non ipsum. Praesent sit amet erat ut purus maximus malesuada. Donec tristique lorem et est aliquam pellentesque sit amet quis massa. Donec aliquet nisl sed urna venenatis pretium. Etiam pulvinar magna eget viverra consequat. Nunc non malesuada ante. Quisque tincidunt ligula aliquet dolor mollis, vel condimentum neque aliquet. Aenean consectetur ipsum eu condimentum tincidunt. Ut viverra, massa eget rhoncus sagittis, augue odio consectetur sem, tristique sagittis nisi dui vel nulla."
    },
    {
        name: "Desert Mesa", 
        image: "https://image.ceneostatic.pl/data/products/53437739/i-eurotrail-namiot-rodzinny-dla-4-osob-alabama-btc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ornare ante. Donec feugiat quam nec felis tempor venenatis. In tempor suscipit nunc, sed iaculis magna vehicula vel. In scelerisque tellus quis mi hendrerit cursus. Quisque congue, ex id pellentesque placerat, risus enim fringilla orci, sit amet pharetra tortor arcu et justo. Sed turpis metus, iaculis tristique feugiat ut, mollis non ipsum. Praesent sit amet erat ut purus maximus malesuada. Donec tristique lorem et est aliquam pellentesque sit amet quis massa. Donec aliquet nisl sed urna venenatis pretium. Etiam pulvinar magna eget viverra consequat. Nunc non malesuada ante. Quisque tincidunt ligula aliquet dolor mollis, vel condimentum neque aliquet. Aenean consectetur ipsum eu condimentum tincidunt. Ut viverra, massa eget rhoncus sagittis, augue odio consectetur sem, tristique sagittis nisi dui vel nulla."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ornare ante. Donec feugiat quam nec felis tempor venenatis. In tempor suscipit nunc, sed iaculis magna vehicula vel. In scelerisque tellus quis mi hendrerit cursus. Quisque congue, ex id pellentesque placerat, risus enim fringilla orci, sit amet pharetra tortor arcu et justo. Sed turpis metus, iaculis tristique feugiat ut, mollis non ipsum. Praesent sit amet erat ut purus maximus malesuada. Donec tristique lorem et est aliquam pellentesque sit amet quis massa. Donec aliquet nisl sed urna venenatis pretium. Etiam pulvinar magna eget viverra consequat. Nunc non malesuada ante. Quisque tincidunt ligula aliquet dolor mollis, vel condimentum neque aliquet. Aenean consectetur ipsum eu condimentum tincidunt. Ut viverra, massa eget rhoncus sagittis, augue odio consectetur sem, tristique sagittis nisi dui vel nulla."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
