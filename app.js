const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    let campgrounds = [
        {name: 'Salmon Creek', image: 'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f8c97aa4e5bdb9_340.jpg'},
        {name: 'Granite Hill', image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f8c97aa4e5bdb9_340.jpg'},
        {name: "Mountain Goat's Rest", image: 'https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104496f8c97aa4e5bdb9_340.jpg'},
    ]

    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(port, () => {
    console.log('YelpCamp Server has started');
});