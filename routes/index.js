//Index.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

router.get('/', function(req, res) {
  res.redirect('/movies');
});

router.get('/movies', function(req, res) {
  const movieFilter = {},
    searchExists = false;
  
  if(req.query.director) {
    movieFilter.director = req.query.director; 
    searchExists = true;
  }
 
  Movie.find(movieFilter, function(err, movies) {
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
	//console.log('Test');
	//console.log(req);
	//if(req.query.director){
	//console.log(req.query.director);
	//console.log("HGUOEWHGLQEGNLGNQ");
	//console.log(req.body.director);
//	}
//	Movie.find({director: req.query.director}, function(err, movies, ecount){
	Movie.find({director: {$eq: req.query.director}}, function(err, movies, count){
		console.log(movies);
		console.log("GGQGQ", count);
		if(err){
			console.log(err);
			res.json(err);
		}else if(movies.length === 0){
			console.log("GET", count);
			Movie.find({}, function(err, m){
				res.json(m.map(function(ele){
					return{
						'title': ele.title,
						'director': ele.director,
						'year': ele.year		
					};
				}));
			});
		}else{
			//res.json(movies);
			res.json(movies.map(function(ele) {
				return {
					'title': ele.title,
					'director': ele.director,
					'year': ele.year
			//		'versionKey: true
				};
			}));
		}
	});
});
module.exports = router;
