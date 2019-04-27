var mongoose = require("mongoose");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
//Schema compilation to mongoose model
module.exports = mongoose.model("Campground", campgroundSchema);
