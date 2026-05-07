import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kiểm tra giả lập
        if (email === "admin@gmail.com" && password === "123456") {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
            window.location.reload(); // Để Header cập nhật ngay
        } else {
            setError("Email hoặc mật khẩu không chính xác. Vui lòng thử lại!");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>Đăng nhập</h1>
                
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input 
                            type="email" 
                            id="email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <label htmlFor="email">Email hoặc số điện thoại</label>
                    </div>

                    <div className="input-container">
                        <input 
                            type="password" 
                            id="password"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <label htmlFor="password">Mật khẩu</label>
                    </div>

                    <button type="submit" className="btn-login">Đăng nhập</button>
                </form>

                <div className="login-options">
                    <div className="remember">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Ghi nhớ tôi</label>
                    </div>
                    <a href="#">Bạn cần trợ giúp?</a>
                </div>

                <div className="login-signup">
                    <span>Mới tham gia GryphMovies?</span>
                    <a href="#"> Đăng ký ngay</a>.
                </div>
            </div>
        </div>
    );
}

export default Login;