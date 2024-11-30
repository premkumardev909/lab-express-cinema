const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/movies', (req, res) => {
    Movie.find()
        .then(movies => {
            res.render('movies', { movies });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving movies');
        });
});

router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send('Movie not found');
            }
            res.render('movie-detail', { movie });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving movie');
        });
});

module.exports = router;