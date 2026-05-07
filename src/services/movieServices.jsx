import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'vi-VN'
    }
});

export const movieService = {

    getTrendingMovies: async (type="day", page = 1, signal) => {
        const response = await apiClient.get(`/trending/movie/${type}`, {
            params: { page },
            signal: signal 
        });
        return response.data;
    },

    getMovieDetails: async (movieId) => {
        const response = await apiClient.get(`/movie/${movieId}`, {
            params: { language: 'vi-VN' }
        });
        return response.data;
    },

    getMovieVideos: async (movieId) => {
        const response = await apiClient.get(`/movie/${movieId}/videos`, {
            params: { language: 'vi-VN' }
        });
        return response.data;
    },

    getGenres: async () => {
        const response = await apiClient.get(`/genre/movie/list`, {
            params: { language: 'vi-VN' }
        });
        return response.data.genres;
    },

    getMoviesByGenre: async (genreId, page = 1) => {
        const response = await apiClient.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
                page: page,
                language: 'vi-VN',
                sort_by: 'popularity.desc' // Phim hot nhất lên đầu
            }
        });
        return response.data;
    },

    searchMovies: async (query, page = 1) => {
        const response = await apiClient.get(`/search/movie`, {
            params: {
                query: query,
                page: page,
                language: 'vi-VN',
                include_adult: false
            }
        });
        return response.data;
    },
};