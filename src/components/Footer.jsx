import React from 'react';
import '../assets/styles/Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="logo">GRYPH<span>MOVIES</span></h2>
                        <p>Trang web xem phim trực tuyến chất lượng cao, cập nhật phim mới mỗi ngày.</p>
                    </div>
                    
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Khám phá</h4>
                            <ul>
                                <li><a href="#">Phim Mới</a></li>
                                <li><a href="#">Phim Bộ</a></li>
                                <li><a href="#">Phim Lẻ</a></li>
                                <li><a href="#">Phim Chiếu Rạp</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Hỗ trợ</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Trung tâm trợ giúp</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                                <li><a href="#">Điều khoản sử dụng</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="footer-bottom">
                    <p>&copy; {currentYear} GRYPHMovies. All Rights Reserved.</p>
                    <div className="social-icons">
                        <a href="#" title="Facebook">FB</a>
                        <a href="#" title="Youtube">YT</a>
                        <a href="#" title="Instagram">IG</a>
                        <a href="#" title="TikTok">TT</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;