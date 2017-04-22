const mongoose = require('mongoose');

const Movie = mongoose.Schema({
  title: String,
  director: String,
  year: Number
});

mongoose.model('Movie', Movie);
mongoose.connect('mongodb://localhost/hw08');
