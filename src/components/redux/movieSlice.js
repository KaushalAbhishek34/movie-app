import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  showFavorites: false,
  currentPage: 1,
  searchTerm: '',
  movieList: 'now_playing',
  movies: [],
  totalPages: 1,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const isFavorite = state.favorites.some(favorite => favorite.id === movie.id);
      if (isFavorite) {
        state.favorites = state.favorites.filter(favorite => favorite.id !== movie.id);
      } else {
        state.favorites.push(movie);
      }
    },
    setShowFavorites: (state, action) => {
      state.showFavorites = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMovieList: (state, action) => {
        state.movieList = action.payload;
      },
    changeToPopular: (state) => {
      state.movieList = "popular";
      state.currentPage = 1;
      state.searchTerm = '';
    },
    changeToTopRated: (state) => {
      state.movieList = "top_rated";
      state.currentPage = 1;
      state.searchTerm = '';
    },
    changeToUpcoming: (state) => {
      state.movieList = "upcoming";
      state.currentPage = 1;
      state.searchTerm = '';
    },
    setMoviesAndTotalPages: (state, action) => {
        state.movies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      },
    minusPage: (state) =>{
        if (state.currentPage > 1 ){
            state.currentPage--;
        }
       
    },
    plusPage: (state) =>{
        if (state.currentPage < state.totalPages){
            state.currentPage++;
        }
        
    }
  }
});

export const {
  toggleFavorite,
  setShowFavorites,
  setCurrentPage,
  setSearchTerm,
  setMovieList,
  changeToPopular,
  changeToTopRated,
  changeToUpcoming,
  setMoviesAndTotalPages,
  minusPage,
  plusPage
} = movieSlice.actions;

export default movieSlice.reducer;
