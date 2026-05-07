import { Link } from 'react-router-dom';
function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${movie?.poster_path}`} 
                    alt={movie?.title} 
                />
                <h3 className="movie-title">{movie?.title}</h3>
            </Link>
                <p className="movie-rating">⭐ {movie?.vote_average?.toFixed(1)}</p>
                <p className="movie-release-year"> {movie?.release_date}</p>
        </div>

    )
}
export default MovieCard