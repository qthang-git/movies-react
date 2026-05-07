import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/MovieDetail.css';
import { movieService } from '../services/movieServices';

function MovieDetail() {
    const { id } = useParams(); // Lấy id phim từ URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await movieService.getMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Lỗi lấy chi tiết phim:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào trang chi tiết
    }, [id]);

    if (loading) return <div className="loading">Đang tải phim...</div>;
    if (!movie) return <div className="error">Không tìm thấy thông tin phim!</div>;

    return (
        <div className="movie-detail">
            {/* Backdrop làm nền mờ phía sau */}
            <div 
                className="backdrop" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            ></div>

            <div className="detail-container">
                <div className="detail-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>

                <div className="detail-info">
                    <h1>{movie.title}</h1>
                    <p className="tagline">{movie.tagline}</p>
                    
                    <div className="meta">
                        <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.runtime} phút</span>
                    </div>

                    <div className="genres">
                        {movie.genres.map(g => <span key={g.id}>{g.name}</span>)}
                    </div>

                    <h3>Nội dung</h3>
                    <p className="overview">{movie.overview || "Đang cập nhật nội dung..."}</p>

                    <button className="btn-play">▶ Xem Trailer</button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;