import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';

const App = () => {
    return (
        <Router>
            <Main />
        </Router>
    )
}

const Main = () => {

    const joinMeeting = () => {
        window.open("https://moderated.jitsi.net/dcfd53b3fb124e0098a6f56ef8465ff431b550b25e5a4db6bbf715dea7a49561");
    }

    return (
        <div>
            <div id="header" className="App-header">
                <div style={{textAlign: "center"}}>
                    <p>After clicking the Start Meeting button, click "Join as Moderator" button.</p>
                    <StartButton roomAlias='Start Meeting' callBack={joinMeeting}/>
                </div>
            </div>
        </div>
    )
}

const StartButton = ({ roomAlias, callBack }) => {

    const handleClick = () => {
        callBack()
    }

    return (
        <button className="StartButton" onClick={handleClick}>{roomAlias}</button>
    )
}

export default App
