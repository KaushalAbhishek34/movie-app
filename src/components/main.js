import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Tooltip,
  IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import './component.css';

import { toggleFavorite, setShowFavorites, setCurrentPage, setSearchTerm,  changeToPopular, changeToTopRated, changeToUpcoming,setMoviesAndTotalPages, minusPage,plusPage } from './redux/movieSlice';
  import { useFetchMoviesQuery } from './redux/movieApi';

const MovieApp = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movie.favorites);
  const showFavorites = useSelector(state => state.movie.showFavorites);
  const currentPage = useSelector(state => state.movie.currentPage);
  const searchTerm = useSelector(state => state.movie.searchTerm);
  const movieList = useSelector(state => state.movie.movieList);
  const {  data } = useFetchMoviesQuery({ searchTerm, currentPage,movieList });
  const movies = useSelector(state => state.movie.movies)
  const totalPages = useSelector(state => state.movie.totalPages)
  const searchInputRef = useRef(null);

  if(data){
    dispatch(setMoviesAndTotalPages({ movies: data.results, totalPages: data.total_pages }));
  }
 
  const handleFavoriteToggle = (movie) => {
    dispatch(toggleFavorite(movie));
  };

  const isFavorite = (movie) => favorites.some(favorite => favorite.id === movie.id);

  const handleShowFavorites = () => {
    dispatch(setShowFavorites(!showFavorites));
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(searchInputRef.current.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <TextField
        inputRef={searchInputRef}
        id="outlined-basic"
        label="MOVIE"
        variant="outlined"
        size="small"
        color="success"
        sx={{ width: '60%', paddingBottom: 3 }}
      />
      <IconButton
        sx={{ marginLeft: 1 }}
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
      <Button
        variant="contained"
        color={showFavorites ? "primary" : "error"}
        onClick={handleShowFavorites}
        sx={{ marginLeft: 2 }}
      >
        {showFavorites ? 'All Movies' : ' Favorites'}
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color='warning'
          sx={{ margin: 2 }}
          onClick={() =>{
            dispatch(changeToPopular());
          }}
        >
          popular
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          color='warning'
          onClick={() =>{
            dispatch(changeToTopRated());
          }}
        >
          top rated
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          color='warning'
          onClick={() => {
            dispatch(changeToUpcoming());
          }}
        >
          upcoming
        </Button>
      </div>
      <Grid container spacing={3}>
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
          : movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
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
        <Button
          variant="contained"
          onClick={() => dispatch(minusPage(currentPage))}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span className='paging'>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          variant="contained"
          onClick={() => dispatch(plusPage(currentPage))}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default MovieApp;