import GenresPage from "./GenresPage";
import TrendingPage from "./TrendingPage";

function Home() {

    return (
        <div className="movie-container">
            <div>
                <TrendingPage />
            </div>
            <div>
                <GenresPage />
            </div>
        </div>
    );
}

export default Home;