import React, { useState } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';

import { Jutsu } from 'react-jutsu';

import './App.css';

const App = () => {
    const roomOptions = {
        "Landing Page": "STM",
        "Entertainment": "STM/Entertainment",
        "Spiritual": "STM/Spiritual",
        "Food": "STM/Food",
    }
    const [showRoom, setShowRoom] = useState(false);
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const [displayName, setDisplayName] = useState();

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const joinMeeting = (roomName) => {
        setShowRoom(false);
        setLoading(true);
        delay(1000).then( () => {
            setRoom(
                <Jutsu subject={roomName}
                    roomName={roomName} 
                    displayName={displayName}
                    onMeetingEnd={() => console.log('Meeting has ended')} 
                    containerStyles={{ width: window.innerWidth, height: window.innerHeight - 100 }}
                />
            );
            setLoading(false);
            setShowRoom(true);
        }
        )
    }

    const roomElems = []
    Object.entries(roomOptions).forEach(
        ([key, value]) => {
            roomElems.push(
                <StartButton key={value}
                    roomName={value}
                    roomAlias={key}
                    callBack={joinMeeting}/>
            )
        }
    )

    return (
        <div>
            <div className="App-header">
                <div style={{textAlign: "center", marginBottom: "25px"}}>
                    {roomElems}
                </div>
                <div>
                    <label>Your Name: </label>
                    <input value={displayName} onChange={(e) => {setDisplayName(e.target.value) }}/>
                    <br />
                    <label style={{fontSize: "12px"}}>(Ignore the prompt after entering to change this)</label>
                </div>
            </div>
            {loading && <ProgressComponent/>}
            {showRoom && room}
        </div>
    )
}

const StartButton = ({ roomName, roomAlias, callBack }) => {

    const handleClick = () => {
        callBack(roomName)
    }

    return (
        <button className="StartButton" onClick={handleClick}>{roomAlias}</button>
    )
}
export default App
