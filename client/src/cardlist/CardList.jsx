import React from 'react';
import ExpandCard from '../expandCard/expandCard';
import './CardList.css';

function CardList(props) {
    return (
        <div>
        {
            props.items.map((item, idx) => {
                return(
                    <ExpandCard
                        id={item._id}
                        homeTeam={item.homeTeam}
                        awayTeam={item.awayTeam}
                        homeRank={item.homeRank}
                        awayRank={item.awayRank}
                        homeOdds={item.homeOdds}
                        gameImage={item.gameImage}
                    />
                )
            })         
        }
        </div>
    )
}

export default CardList;