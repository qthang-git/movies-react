import { useState, useEffect } from 'react';
import axios from 'axios';
import { movieService } from '../services/movieServices';
import '../assets/styles/TrendingPage.css';
import MovieCard from '../components/MovieCard';
import MovieLoading from '../components/MovieLoading';
import GenresPage from "./GenresPage";
import Pagination from '../components/Pagination';

function TrendingPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [trendingType, setTrendingType] = useState('day');
    
    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            setLoading(true);
            setIsError(false);
            try {
                const res = await movieService.getTrendingMovies(trendingType, page, controller.signal);
                if (res && res.results) {
                    setMovies(res.results);
                    setTotalPages(res.total_pages);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request cancelled");
                } else {
                    setIsError(true);
                    console.error("Lỗi fetch phim:", error);
                }
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [trendingType, page]);

    const handleTagClick = (type) => {
        setTrendingType(type);
        setPage(1);
        console.log("Đang lấy phim theo:", type);
    }

    return (
        <div className="movie-trending">
            <h1 >🎬 Movie Hot 
            <span 
                className={`trending-tag ${trendingType === 'day' ? 'active' : ''}`}
                onClick={() => handleTagClick('day')}
            >
                Ngày
            </span>
            
            <span 
                className={`trending-tag ${trendingType === 'week' ? 'active' : ''}`}
                onClick={() => handleTagClick('week')}
            >
                Tuần
            </span>
            </h1>
            <div className="movie-list">
                {isError ? (
                    <div className="error-msg">Toang rồi ní ơi, thử lại sau nhé!</div>
                ) : loading ? (
                    <MovieLoading count={20} />
                ) : (
                    movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
            {!loading && !isError && (
                <Pagination 
                    currentPage={page} 
                    totalPages={totalPages} 
                    onPageChange={(newPage) => setPage(newPage)} 
                />
            )}
        </div>
    );
}

export default TrendingPage;