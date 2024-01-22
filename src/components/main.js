import React, { useEffect, useState, useRef, useMemo } from 'react';
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

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);
  const [movieList, setMovieList] = useState("now_playing");

  const searchInputRef = useRef(null);

  // const searchMovies = useMemo(
  //   () => async () => {
  //     const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=cd1fa48b9c76b58e20e48ca5597505d7&query=${searchTerm}&page=${currentPage}`;
  //     try {
  //       let response = await fetch(apiUrl);
  //       let data = await response.json();
  //       setMovies(data.results);
  //       setTotalPages(data.total_pages);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   },
  //   [searchTerm, currentPage]
  // );

  const fetchMovies = useMemo(
    () => async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieList}?api_key=cd1fa48b9c76b58e20e48ca5597505d7&page=${currentPage}`;
      try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [currentPage, movieList]
  );

  useEffect(() => {
    console.log('Fetching movies ...');
   
    fetchMovies();
  }, [  fetchMovies]);

  
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

  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
    setCurrentPage(1);
  };
  
  const changeToPopular = () =>{
    setMovieList("popular");
    setCurrentPage(1);
    setSearchTerm('');
  }
  const changeToTopRated = () =>{
    setMovieList("top_rated");
    setCurrentPage(1);
    setSearchTerm('');
  }
  const changeToUpcoming = () => {
    setMovieList("upcoming");
    setCurrentPage(1);
    setSearchTerm('');
  }

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
          onClick={changeToPopular}
        >
          popular
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          color='warning'
          onClick={changeToTopRated}
        >
          top rated
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 2 }}
          color='warning'
          onClick={changeToUpcoming}
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
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span className='paging'>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          variant="contained"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>
    </Container>
  );
};

export default MovieApp;