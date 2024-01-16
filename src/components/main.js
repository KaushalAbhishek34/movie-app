import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, TextField, Tooltip, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './component.css';

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cd1fa48b9c76b58e20e48ca5597505d7&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <TextField
        id="outlined-basic"
        label="MOVIE"
        variant="outlined"
        size="small"
        sx={{ width: '60%', paddingBottom: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color={showFavorites ? "primary" : "error"} onClick={handleShowFavorites} sx={{ marginLeft: 2 }}>
        {showFavorites ? 'All Movies' : ' Favorites'}
      </Button>
      <Grid container spacing={6}>
        {showFavorites
          ? favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%"  }}>
                <CardMedia
                  component="img"
                  height=""
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`)}
                    sx={{ marginRight: 2 }}
                  >
                    View on TMDB
                  </Button>
                  <Tooltip title="Remove from Favorites">
                    <IconButton
                      onClick={() => handleFavoriteToggle(movie)}
                    >
                      <FavoriteIcon sx={{ fontSize: 'xlarge', color: 'red' }} />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          ))
          : filteredMovies.map((movie) => (
            <Grid item key={movie.id} s={12} md={6} lg={4}>
              <Card sx={{ height: "100%"  }}>
                <CardMedia
                  component="img"
                  height= ""
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average}
                  </Typography>
                  <Button
                    variant="contained"
                    color='info'
                    onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`)}
                    sx={{ marginRight: 2  }}
                  >
                    View on TMDB
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
      <div>
        <Button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default MovieApp;
