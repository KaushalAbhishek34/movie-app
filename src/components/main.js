import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, TextField, Tooltip, IconButton, Link } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './component.css';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetch("https://dummyapi.online/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.movie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteToggle = (movie) => {
    const isFavorite = favorites.some(favorite => favorite.id === movie.id);
    if (isFavorite) {
      setFavorites(favorites.filter(favorite => favorite.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movie) => favorites.some(favorite => favorite.id === movie.id);
  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4}}>
      {/* <Typography
        variant='h5'
        component='span'
        fontWeight='600'
        sx={{ paddingRight: 2, color: 'green' }}
      >
        SEARCH
      </Typography> */}
      <TextField
        id="outlined-basic"
        label="MOVIE"
        variant="outlined"
        size="small"
        sx={{ width: '60%', paddingBottom: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color={showFavorites ? "primary": "error"} onClick={handleShowFavorites} sx={{ marginLeft: 2 }}>
        {showFavorites ? 'All Movies' : ' Favorites'}
      </Button>
        <Grid container spacing={6}>
          {showFavorites
            ? favorites.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={movie.image}
                      alt={movie.movie}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {movie.movie}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {movie.rating}
                      </Typography>
                      <Tooltip title="Remove from Favorites">
                        <IconButton
                          onClick={() => handleFavoriteToggle(movie)}
                        >
                          <FavoriteIcon sx={{ fontSize: 'large', color: 'red' }} />
                        </IconButton>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : filteredMovies.map((movie) => (
                <Grid item key={movie.id} s={12} md={6} lg={4}>
                  <Card sx={{ height: '100%'}}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={movie.image}
                      alt={movie.movie}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {movie.movie}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rating: {movie.rating}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => window.open(movie.imdb_url)}
                        sx={{ marginRight: 2 }}
                      >
                        View on IMDb
                      </Button>
                      <Tooltip title={isFavorite(movie) ? "Remove from Favorites" : "Add to Favorites"}>
                        <IconButton
                          onClick={() => handleFavoriteToggle(movie)}
                        >
                          {isFavorite(movie) ? (
                            <FavoriteIcon sx={{ fontSize: 'xlarge', color: 'red' }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ fontSize: 'xlarge' }} />
                          )}
                        </IconButton>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
    </Container>
  );
};

export default MovieApp;
