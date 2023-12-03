import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './CommentList.css';
import Comment from '../comments/Comment';




function CommentList(props) {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem('auth-token'))
    }, []);
    
    return (<>
        
        { 
            props.comments.filter(com => com.game === props.gameId).map(com => {
                return(
                    <Comment
                        id={com._id}
                        name={com.name}
                        content={com.content}
                        game={com.game}
                        handleDeleted={() => console.log('Call to handleDeleted()')}
                        isEditable={token}
                    />
                );
            })
        }
    </>);
}

export default CommentList;
