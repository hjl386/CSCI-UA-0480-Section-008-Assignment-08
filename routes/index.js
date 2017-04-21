//Index.js

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  var movieFilter = {},
    searchExists = false;
  
  if(req.query.director) {
    movieFilter.director = req.query.director; 
    searchExists = true;
  }
 
  Movie.find(movieFilter, function(err, movies, count) {
    res.render('movies', {'movies': movies, searchExists: searchExists, director: req.query.director });
  });
});
/*
router.post('/movies/create', function(req, res) {
  (new Movie({
      title: req.body.movieTitle,
      director: req.body.movieDirector,
      year: req.body.movieYear
  })).save(function(err, movie, count) {
    res.redirect('/movies');
  });
});

router.get('/movies/create', function(req, res) {
  res.render('movies-create', {}); 
});
*/

router.get('/api/movies/create', function(req, res){
/*	Movie.find({director: req.body.movieDirector}, (err, movies) => {
		res.json(movies);
	});	*/
	Movie.find({}, (err, movies) => {
		res.json(movies);
	});
});

router.post('/api/movies/create', function(req, res){
	(new Movie({
		title: req.body.movieTitle,
		director: req.body.movieDirector,
		year: req.body.movieYear
	})).save((err, movie) => {
		if(err){
			console.log(err);
			res.json(err);
		} else{
			res.json(movie);
		}
	});
});

/*
router.get('/api/movies', function(req, res){
	Movie.find({director: req.query.director}, (err, movies) => {
		if(err){
			console.log(err);
			res.json(err);
		} else{
			res.json(movies);
		}
	});
});
*/

router.get('/api/movies', function(req, res){
//	const f = {};
	//if(req.query.director){
		
//	}
	Movie.find({director: req.query.director}, function(err, movies, ecount){
		res.json(movies.map(function(ele) {
			return {
				'title': ele.title,
				'director': ele.director,
				'year': ele.year
			}
		}));
	});
});
module.exports = router;
