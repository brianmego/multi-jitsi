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
        window.open("https://meet.jit.si/moderated/0de4bf8d6f2f1f8e216ffe94150197aa8cf9eeddbe799f173083ded7786d9f94");
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
