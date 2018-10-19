const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
mongoose.connect(process.env.DB_URI);

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    // res.render('campgrounds', {campgrounds: campgrounds});
    Campground.find({}, (err, allCampgrounds) => {
        if(err)
            console.log(err);
        else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new.ejs');
});

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req,res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err)
            console.log(err);
        else {
            res.render('show', {campground: foundCampground});
        }
    });

    
});

//CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
    //let name = req.body.name;
    //let image = req.body.image;
    let newCampground = {name: req.body.name, image: req.body.image, description: req.body.description};
    //campgrounds.push({name: name, image: image});
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err)
            console.log(err)
        else {
            res.redirect('/campgrounds');
        }
    });

    //res.redirect('/campgrounds');
});

app.listen(process.env.PORT, () => {
    console.log('YelpCamp Server has started');
});