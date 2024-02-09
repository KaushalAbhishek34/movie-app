import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import { movieApi } from './movieApi';

const store = configureStore({
  reducer: {
    movie: movieReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware),
});

export default store;
