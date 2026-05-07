import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm Link và useNavigate
import '../assets/styles/Header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập từ localStorage khi component mount
        const userStatus = localStorage.getItem('isLoggedIn');
        if (userStatus === 'true') {
            setIsLoggedIn(true);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        setIsLoggedIn(false);
        navigate('/'); // Đưa về trang chủ sau khi logout
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchTerm.trim()) {
                // Chuyển hướng sang trang kết quả tìm kiếm kèm theo query
                navigate(`/search?query=${searchTerm}`);
            }
        }
    };

    return (
        <header className={isScrolled ? "header scrolled" : "header"}>
            <div className="header-container">
                <div className="header-left">
                    {/* Dùng Link thay cho thẻ a */}
                    <Link to="/" className="logo">GRYPH<span>MOVIES</span></Link>
                    <nav className="nav-menu">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/movies">Phim lẻ</Link></li>
                            <li><Link to="/tv-shows">Phim bộ</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="header-right">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Tìm tên phim..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <button onClick={handleSearch}>🔍</button>
                    </div>

                    {isLoggedIn ? (
                        <div className="user-profile">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                                alt="User Avatar" 
                                onClick={handleLogout} 
                                title="Click để đăng xuất"
                            />
                        </div>
                    ) : (
                        // Chuyển hướng sang trang /login khi bấm nút
                        <button 
                            className="login-btn" 
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;