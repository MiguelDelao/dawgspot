import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import UserContext from "../context/UserContext";

import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext);

    /**
     * @function loginHandler - a function that handles login
     * @param {Event} e - the event that triggered the function
     * @returns {void} - returns nothing
     * @description - logs in a user
     * @version 0.0.1
     * Last edited 11/30/2023 by Cannon M. Hutcheson & Nathan Christian
    */
    async function loginHandler(e) {
        e.preventDefault();
        // props.toggleIsAdmin(); -- is this needed?
        setLoading(true);
        try {
            const loginUser = { email, password };
            const loginRes = await axios.post("http://localhost:8089/api/users/login", loginUser);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem("auth-token", loginRes.data.token);
            setLoading(false);
            navigate("/");
            window.location.reload();
        } catch(err) { 
            setLoading(false);
            setError(err.response.data.msg);
        } // try-catch
    } // loginHandler

    return (
        <div id="login-container" className="container">
            <h1 id="login-header">Login</h1>
            {error ? <p id="login-error-text">{`Error: ${error}`}</p> : <></> }
            
            <form onSubmit={loginHandler}>
                <input id="login-username-box" type="text" placeholder="Email..." className="input-box" required onChange={e => setEmail(e.target.value)}/>
                <br />
                <input id="login-password-box" type="password" placeholder="Password..." className="input-box" required onChange={e => setPassword(e.target.value)}/>
                <div className="login-buttons">
                    <Link to="/signup" className="generic-button" id="signup-button">Sign Up</Link>
                    <button className="generic-button" id="login-button" onClick={loginHandler}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;