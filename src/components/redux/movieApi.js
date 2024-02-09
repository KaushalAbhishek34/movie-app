import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    fetchMovies: builder.query({
      query: ({ searchTerm, movieList, currentPage }) => {
        if (searchTerm) {
          return `search/movie?api_key=cd1fa48b9c76b58e20e48ca5597505d7&query=${searchTerm}&page=${currentPage}`;
        } else {
          return `movie/${movieList}?api_key=cd1fa48b9c76b58e20e48ca5597505d7&page=${currentPage}`;
        }
      },
    }),
  }),
});

export const { useFetchMoviesQuery } = movieApi;
