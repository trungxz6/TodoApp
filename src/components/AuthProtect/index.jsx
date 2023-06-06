import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProtect = (props) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(()=>{
        if (localStorage.getItem('crrUser')){
            const getUser = JSON.parse(localStorage.getItem('crrUser'));
            console.log(getUser);
            if (getUser.mail && getUser.pass) {
                setLoading(false);
                navigate('/home');
            }else {
                navigate('/auth/login');
                localStorage.removeItem('crrUser')
            }
        }else {
            navigate('/auth/login');
            localStorage.removeItem('crrUser')
        }
    }, [])
    return (
        <>
            {loading ? <div>Loading...</div> : props.children}
        </>
    )
}

export default AuthProtect