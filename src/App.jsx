import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/Common.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import SearchPage from "./pages/SearchPage";
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header /> 

        <main style={{ flex: 1, marginTop: '70px' }}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>

        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;