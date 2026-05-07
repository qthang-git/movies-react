import React, { useEffect, useState, useRef } from 'react';
import { movieService } from '../services/movieServices';
import MovieCard from '../components/MovieCard';
import MovieLoading from '../components/MovieLoading';
import Pagination from '../components/Pagination';
import '../assets/styles/GenresPage.css';

function GenresPage() {
    const contentRef = useRef(null);
    const isFirstRender = useRef(true);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);

        return () => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            const data = await movieService.getGenres();
            setGenres(data);
            if (data.length > 0) setSelectedGenre(data[0]);
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        if (!selectedGenre) return;

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const data = await movieService.getMoviesByGenre(selectedGenre.id, page);
                setMovies(data.results);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                if (!isFirstRender.current) {
                    setTimeout(() => {
                        contentRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                } else {
                    isFirstRender.current = false;
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [selectedGenre, page]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        setPage(1);
    };

    return (
        <div className="genres-page">
            <aside className="genres-sidebar">
                <h3>Thể loại</h3>
                <ul>
                    {genres.map((g) => (
                        <li 
                            key={g.id} 
                            className={selectedGenre?.id === g.id ? "active" : ""}
                            onClick={() => handleGenreClick(g)}
                        >
                            {g.name}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="genres-content" ref={contentRef}>
                <div className="content-header">
                    <h2>🎬 Thể Loại: <span>{selectedGenre?.name}</span></h2>
                </div>
                <div className="movie-list">
                    {loading ? (
                        <MovieLoading count={20} />
                    ) : (
                        <>
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                            <Pagination 
                                currentPage={page} 
                                totalPages={totalPages} 
                                onPageChange={(p) => setPage(p)} 
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default GenresPage;