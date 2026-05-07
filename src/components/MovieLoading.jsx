function MovieLoading({ count=5 }){
    const skeletons = Array.from({ length: count }, (_, index) => index);
    return (
        <>
        {skeletons.map(item => (
            <div className="movie-card movie-skeleton" key={item}>
                <img className="movie-poster"
                />
                <h3 className="movie-title"> </h3>
                <p className="movie-rating"> </p>
                <p className="movie-release-year"> </p>
            </div>
        ))}
        </>
    )
}
export default MovieLoading