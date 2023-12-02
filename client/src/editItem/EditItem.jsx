import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './EditItem.css';
import ErrorPage from '../ErrorPage/ErrorPage';

import axios from 'axios';

function EditItem(props) {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem('auth-token'))
    }, []);

    const{id} = useParams();

    const [formData, setFormData] = useState({
        homeTeam: '',
        awayTeam: '',
        homeRank: '',
        awayRank: '',
        homeOdds: '',
        gameImage: ''
    });
    /*
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [homeRank, setHomeRank] = useState('');
    const [awayRank, setAwayRank] = useState('');
    const [homeOdds, setHomeOdds] = useState('');
    const [gameImage, setGameImage] = useState('');
    */
    const [error, setError] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8089/api/games/${id}`);
                const gameData = response.data;

                setFormData({
                    homeTeam: gameData.homeTeam,
                    awayTeam: gameData.awayTeam,
                    homeRank: gameData.homeRank,
                    awayRank: gameData.awayRank,
                    homeOdds: gameData.homeOdds,
                    gameImage: gameData.gameImage
                });
            } catch (err) {
                err.response.data.msg && setError(err.response.data.msg);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    /*
    const homeTeamChangeHandler = event => setHomeTeam(event.target.value);
    const awayTeamChangeHandler = event => setAwayTeam(event.target.value);
    const homeRankChangeHandler = event => setHomeRank(event.target.value);
    const awayRankChangeHandler = event => setAwayRank(event.target.value);
    const homeOddsChangeHandler = event => setHomeOdds(event.target.value);
    const gameImageChangeHandler = event => setGameImage(event.target.value);
    */

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const gameData = {
                homeTeam: formData.homeTeam,
                awayTeam: formData.awayTeam,
                homeRank: formData.homeRank,
                awayRank: formData.awayRank,
                homeOdds: formData.homeOdds,
                gameImage: formData.gameImage
            };

            await axios.put(`http://localhost:8089/api/games/${id}`, gameData);
            navigate('/');
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const handleCancel = () => {
        navigate('/');
    }
    const handleDelete = async () => {
        axios.delete(`http://localhost:8089/api/games/${id}`)
        .then((res) => {
            console.log('Successfully deleted item');
            navigate('/');
        })
        .catch((err) => {
            console.log('Error deleting item');
        });
    };

    if (token) {
        return(
            <div className="container" id="additem-container">
                <h1 className="additem-header">Update Game</h1>
                <form className="additem-form" onSubmit={submitHandler}>
                    <input type="text" name="homeTeam" placeholder="Home Team name.." value={formData.homeTeam} onChange={handleInputChange}/>
                    <input type="text" name="awayTeam" placeholder="Away Team name.." value={formData.awayTeam} onChange={handleInputChange}/>
                    <input type="text" name="homeRank" placeholder="Home Team rank.." value={formData.homeRank} onChange={handleInputChange}/>
                    <input type="text" name="awayRank" placeholder="Away Team rank.." value={formData.awayRank} onChange={handleInputChange}/>
                    <input type="text" name="homeOdds" placeholder="Home Team odds.." value={formData.homeOdds} onChange={handleInputChange}/>
                    <input type="text" name="gameImage" placeholder="URL to game image.." value={formData.gameImage} onChange={handleInputChange}/>
                    <div className="button-container">
                        <button className="generic-button" type="submit">Update Game</button>
                        <button className="generic-button" onClick={handleCancel}>Cancel</button>
                    </div>
                    <br></br>
                    <button id="delete-button" onClick={handleDelete}>Delete Game</button>
                </form>
            </div>
        );
    } else {
        return(<ErrorPage errorText="You are not authorized to view this page."/>)
    }
}

export default EditItem;