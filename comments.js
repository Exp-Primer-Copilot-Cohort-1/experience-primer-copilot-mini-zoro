// Create web server

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// Campground schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // Create a reference to the comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Create a model using the schema
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
//         description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("Newly created campground: ");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//         {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Granite Hill", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//         {name: "Granite Hill", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
//         {name: "Mountain Goat's Rest", image