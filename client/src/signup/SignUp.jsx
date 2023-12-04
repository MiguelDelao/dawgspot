
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

import axios from 'axios';
import UserContext from '../context/UserContext';

/**
 * @author Cannon M. Hutcheson 
 * @version 0.0.1
 * @function SignUp - a function that returns a JSX element
 * @returns {JSX.Element} - a JSX element
*/
export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUserData} = useContext(UserContext);

    /**
     * @author Cannon M. Hutcheson
     * @version 0.0.1
     * @function handleSubmit - a function that handles the submission of a form
     * @param {Event} e - the event that triggered the function
     * @returns {void} - returns nothing
     * @description - Creates a new user and logs them in
    */
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
          const newUser = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            profilePic: profilePic
          };

          await axios.post('http://localhost:8089/api/users/signup', newUser);
          const loginRes = await axios.post('http://localhost:8089/api/users/login', {
            email,
            password,
          });

          setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });

          localStorage.setItem('auth-token', loginRes.data.token);
          setLoading(false);
          navigate('/');

        } catch (err) {
          setLoading(false);
          setError(err.response.data.msg);
        }

        /* Don't need to reset these, because the user might encounter an error
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setProfilePic('');
        */
    } // handleSubmit

  return (
    <div className="SignUp">

      <form onSubmit={handleSubmit}>

        <h1 id="signup-header-text">Sign Up</h1>
        {error ? <p id="signup-error-text">{`Error: ${error}`}</p> : <></> }
        <hr className="hr"/>
        
        <input className="username-entry" placeholder='Username' type="text" id="username" name="username" required onChange={e => setUsername(e.target.value)}/>

        
        <input placeholder='Password' type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)}/>

        
        <input placeholder='Confirm password' type="password" id="confirmPassword" name="confirmPassword" required onChange={e => setConfirmPassword(e.target.value)}/>

        <input placeholder="Profile Pic"  type="text" onChange={e => setProfilePic(e.target.value)}/>
        
        <input placeholder="Email" type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)}/>
        <br />
        <div className="bottom-btns">
        <button type="submit" className="pill-btn" id="submit-btn">Sign Up</button>
        <Link to="/login" className="pill-btn">Go to Login</Link>
        </div>
      </form>
    </div>
  );
}
