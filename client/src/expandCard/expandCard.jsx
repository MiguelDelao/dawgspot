
import React, { useEffect, useState, useRef } from "react";
import "./expandCard.css"

import GameCard from "../gameCard/gameCard";
import CommentList from "../commentlist/CommentList";

import axios from 'axios';

function ExpandCard(props) {
    const [comments, setComments] = useState([])
    const [nameText, setNameText] = useState("");
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8089/api/comments/')
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchComments();
    }, []);
    const nameTextChangeHandler = event => setNameText(event.target.value);
    const commentTextChangeHandler = event => setCommentText(event.target.value);
    const addCommentSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const comment = {
                name: nameText,
                content: commentText,
                game: props.id
            }
            await axios.post('http://localhost:8089/api/comments', comment);
        
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    }

    const [open,setOpen] = useState(false);
    const lowerRef = useRef(null);
    const containerRef = useRef(null);
    const scrollToExpandedContent = () => {
      const cardPosition = lowerRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: cardPosition, behavior: 'smooth' });
  };
    const handleClick = () => {
        console.log('Click event triggered');
        if (open) {
            console.log('Collapsing: setting height to 200');
            lowerRef.current.style.height = '200px';
        } else {
            const scrollHeight = lowerRef.current.scrollHeight;
            console.log(`Expanding: setting height to ${scrollHeight}px`);
            lowerRef.current.style.height = `${scrollHeight}px`;
            setTimeout(scrollToExpandedContent, 200); 
        }
        setOpen(!open);
    };

        return (
          
          <div
            className={"ex-container " } ref={lowerRef}
          >
            <div className="upper">
                <GameCard
                  clicker={handleClick}
                  id={props.id}
                  homeTeam={props.homeTeam}
                  awayTeam={props.awayTeam}
                  homeRank={props.homeRank}
                  awayRank={props.awayRank}
                  homeOdds={props.homeOdds}
                  gameImage={props.gameImage}
                />
            </div>
            <div className="lower">
              <CommentList
                gameId={props.id}
                comments={comments}
              />
              <div id="post-comment">
                <form onSubmit={addCommentSubmitHandler}>
                    <input id="name-box" type="text" required placeholder="Name" value={nameText} onChange={nameTextChangeHandler} maxLength={10}></input>
                    <input id="comment-input-box" type="text" required placeholder="Type a comment.." value={commentText} onChange={commentTextChangeHandler} maxLength={38}></input>
                    <button type="submit" id="post-comment-btn">Post</button>
                </form>
              </div>
            </div>


            
          </div>

        );
}

export default ExpandCard;




  