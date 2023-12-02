import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import axios from 'axios';
import UserContext from './context/UserContext';

import TopBar from './homebar/topbar';
import HomePage from './homepage/HomePage';
import SignUp from './signup/SignUp';
import Login from './login/Login';
import AddItem from './additem/AddItem';
import EditItem from './editItem/EditItem';

import ErrorPage from './ErrorPage/ErrorPage';

function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const tokenResponse = await axios.post(
                'http://localhost:8089/api/users/tokenIsValid',
                null,
                { header: { 'x-auth-token': token } }
            );

            if (tokenResponse.data) {
                const userRes = await axios.get('http://localhost:8089/api/users', {
                    header: { 'x-auth-token': token },
                });

                setUserData({
                    token,
                    user: userRes.data,
                });
            }
        };
        checkLoggedIn();
    }, []);

    return(
        <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
            <div>
                <TopBar/>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/additem' element={<AddItem />} />
                    <Route path='/edititem/:id' element={<EditItem />} />
                    <Route path='*' element={<ErrorPage errorText="404 - Page Not Found!"/>} />
                </Routes>
            </div>
        </Router>
        </UserContext.Provider>
    );
}

export default App;