import './Comment.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Comment(props) {

    const isEditable = props.isEditable;

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(props.content);

    const [comment,setComment] = useState(props.content);

    /*useEffect(() => {
        setComment(editedContent);
    }, [editedContent]);*/

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8089/api/comments/${props.id}`)
            setIsEditing(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = () => {
        setComment(editedContent);
        setIsEditing(true);
    }

    const handleDone = async () => {
        setComment(editedContent);
        try {
            const comment = {
                name: props.name,
                content: editedContent,
                game: props.game
            };

            await axios.put(`http://localhost:8089/api/comments/${props.id}`, comment)
        } catch (err) {
            console.log(err);
        }
        setIsEditing(false);

    }

    const handleInputChange = (e) => {
        setEditedContent(e.target.value);
    }

    return (
        <div className="comment-container">
            <p>{props.name}</p>
            {isEditing ? (
                <input
                    className="comment-input"
                    type="text"
                    value={editedContent}
                    onChange={handleInputChange}
                />
            ) : (
                <h3>{comment}</h3>
            )}
            <div className="comment-buttons">
                {isEditable ? isEditing ? (
                    <button onClick={handleDone}>Done</button>
                ) : (
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                ) : ""}
            </div>
        </div>
    );
}

export default Comment;