import React, { useState, useEffect } from 'react';
import './Comment.css';

export default function Comment(props) {

  const isEditable = props.isEditable;

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(props.content);

    const [comment,setComment] = useState(props.content);

    useEffect(() => {
      setComment(editedContent);
  }, [editedContent]);


    const handleDelete = () => {
      props.handleDeleted();
    }

    const handleEdit = () => {
      setComment(editedContent);
        setIsEditing(true);
    }

    const handleDone = () => {
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
