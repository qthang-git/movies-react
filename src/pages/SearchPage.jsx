import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movieService } from '../services/movieServices';
import '../assets/styles/Movie.css';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import MovieLoading from '../components/MovieLoading';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query'); // Lấy từ khóa từ URL
    
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const data = await movieService.searchMovies(query, page);
                setMovies(data.results);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            } catch (error) {
                console.error("Lỗi khi tìm phim:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, page]); // Chạy lại khi từ khóa hoặc số trang thay đổi

    return (
        <div className="movie-container">
            <h2 style={{ marginBottom: '20px', color: '#fff' }}>
                Kết quả tìm kiếm cho: <span style={{ color: '#e50914' }}>"{query}"</span>
            </h2>

            {loading ? (
                <div className="movie-list">
                    <MovieLoading count={20} />
                </div>
            ) : movies.length > 0 ? (
                <>
                    <div className="movie-list">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={page} 
                            totalPages={totalPages} 
                            onPageChange={(p) => setPage(p)} 
                        />
                    )}
                </>
            ) : (
                <div className="no-results" style={{ color: '#ccc', textAlign: 'center', marginTop: '50px' }}>
                    ☹️ Không tìm thấy phim nào phù hợp với từ khóa của bạn.
                </div>
            )}
        </div>
    );
}

export default SearchPage;