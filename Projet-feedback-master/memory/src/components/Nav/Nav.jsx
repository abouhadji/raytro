import React from 'react';
import Button from '../Button/Button';
import './nav.css';

const Nav = ({signOut}) => {
    return (
        <>
            <div className="Nav">
                <h2>React-Chat</h2>
                <div className="logout">
                <Button onClick={signOut}>Sign out</Button> 
                </div>
                
            </div>
        </>
    );
};

export default Nav;