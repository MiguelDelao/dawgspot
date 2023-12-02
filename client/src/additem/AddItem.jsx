import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddItem.css';
import ErrorPage from '../ErrorPage/ErrorPage';

import axios from 'axios';

function AddItem() {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem('auth-token'))
    }, []);

    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [homeRank, setHomeRank] = useState('');
    const [awayRank, setAwayRank] = useState('');
    const [homeOdds, setHomeOdds] = useState('');
    const [gameImage, setGameImage] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const homeTeamChangeHandler = event => setHomeTeam(event.target.value);
    const awayTeamChangeHandler = event => setAwayTeam(event.target.value);
    const homeRankChangeHandler = event => setHomeRank(event.target.value);
    const awayRankChangeHandler = event => setAwayRank(event.target.value);
    const homeOddsChangeHandler = event => setHomeOdds(event.target.value);
    const gameImageChangeHandler = event => setGameImage(event.target.value);

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const gameData = {
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeRank: homeRank,
                awayRank: awayRank,
                homeOdds: homeOdds,
                gameImage: gameImage
            };
            
            await axios.post('http://localhost:8089/api/games/', gameData);
            navigate('/');
        } catch (err) {
            console.log(err);
        }

        setHomeTeam('');
        setAwayTeam('');
        setHomeRank('');
        setAwayRank('');
        setHomeOdds('');
        setGameImage('');
    }

    function handleCancel() { navigate('/') }

    if (token) {
        return(
            <div className="container" id="additem-container">
                <h1 className="additem-header">Add New Game</h1>
                <form className="additem-form" onSubmit={submitHandler}>
                    <input type="text" id="additem-hometeam" placeholder="Home Team name.." value={homeTeam} onChange={homeTeamChangeHandler}/>
                    <input type="text" id="additem-awayteam" placeholder="Away Team name.." value={awayTeam} onChange={awayTeamChangeHandler}/>
                    <input type="text" id="additem-homerank" placeholder="Home Team rank.." value={homeRank} onChange={homeRankChangeHandler}/>
                    <input type="text" id="additem-awayrank" placeholder="Away Team rank.." value={awayRank} onChange={awayRankChangeHandler}/>
                    <input type="text" id="additem-homeodds" placeholder="Home Team odds.." value={homeOdds} onChange={homeOddsChangeHandler}/>
                    <input type="text" id="additem-gameimage" placeholder="URL to game image.." value={gameImage} onChange={gameImageChangeHandler}/>
                    <div className="button-container">
                        <button className="generic-button" type="submit">Add Item</button>
                        <button className="generic-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return(<ErrorPage errorText="You are not authorized to view this page."/>)
    }
}

export default AddItem;