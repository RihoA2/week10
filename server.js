const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{
    const message = 'jOjoJojO';
    let url = 'https://api.themoviedb.org/3/movie/568160?api_key=7ce4029ab0483bd17670859e806ab381';
    axios.get(url)
    .then(response => {
        let data = response.data;
        let releaseDate =new Date(data.release_date).getFullYear();
        let genresToDisplay = '';
        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name},`;
        });
        let genresUpdated = genresToDisplay.slice(0, -2) + '.';
        let  posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
        
        res.render('index', 
            {dataToRender: data,
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        });
    });


});
app.listen(process.env.PORT || 3000, ()=>{
    console.log('server run 3k.');
});