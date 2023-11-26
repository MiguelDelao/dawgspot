import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';

function TopBar(props) {
  return (
    <div className="top-bar">
      <Link to="/" className="logo">Dawgspot</Link>
      
      { props.isAdmin
        ? <Link to='/additem' className="custom-link">Add New Game</Link>
        : <></> // Optionally render this element based on the value of props.isAdmin 
      }
      { props.isAdmin
        ? <Link to='/' className="custom-link" onClick={props.toggleIsAdmin}>Logout</Link>
        : <>
            <Link to='/signup' className="custom-link">Sign Up</Link>
            <Link to='/login' className="custom-link">Login</Link>            
          </>
      }
    </div>
  );
}

export default TopBar;