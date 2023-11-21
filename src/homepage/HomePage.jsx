import React from 'react';
import CardList from '../cardlist/CardList';
import './HomePage.css';



// Dummy info for each game/item component
const items = [
    { hometeam: "Georgia", awayteam: "Florida", homerank: "20", awayrank: "34", homeodds: "24.6", gameimage: "https://loodibee.com/wp-content/uploads/Florida_Gators_logo.png"},
    { hometeam: "Georgia", awayteam: "Alabama", homerank: "12", awayrank: "16", homeodds: "12.1", gameimage: "https://loodibee.com/wp-content/uploads/Georgia_Bulldogs_logo.png"},
    { hometeam: "Georgia", awayteam: "S. Carolina", homerank: "17", awayrank: "49", homeodds: "5.3", gameimage: "https://loodibee.com/wp-content/uploads/South_Carolina_Gamecocks_logo.png"},
];

function HomePage(props) {
    return (
        <div>
            <div id="banner">
                <div id="background-image"></div>
                <div id="content">
                    <p>Welcome to Dawgspot {props.isAdmin ? "(Admin View)" : ""}</p>
                </div>
            </div>

            <h1 className="section-header">Live Sports Games</h1>
            <CardList items={items} isAdmin={props.isAdmin}/>
        </div>
    )
}

export default HomePage;