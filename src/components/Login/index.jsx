import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="container-login-page">Login
            <button onClick={()=>{
                navigate('/home');
                localStorage.setItem('crrUser', JSON.stringify({
                    id: 1234,
                    username: 'Trung',
                    pass: '123',
                    email: 'trung@gmail.com',
                }))
            }}>Đăng Nhập</button>
        </div>
    )

}

export default Login;