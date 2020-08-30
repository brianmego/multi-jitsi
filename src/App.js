import React, { useState } from 'react';

import { Jutsu } from 'react-jutsu';

const App = () => {
    const roomOptions = {
        "Landing Page": "STM",
        "Entertainment": "STM/Entertainment",
        "Spiritual": "STM/Spiritual",
        "Food": "STM/Food",
    }
    const [room, setRoom] = useState(null);
    const userInfo = {'displayName': 'MyName'}

    const joinMeeting = (roomName) => {
        setRoom(null);
        setRoom(<Jutsu roomName={roomName} userInfo={userInfo} />);
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
            <div>
                {roomElems}
            </div>
            {room}
        </div>
    )
}

const StartButton = ({ roomName, roomAlias, callBack }) => {

    const handleClick = () => {
        callBack(roomName)
    }

    return (
        <button onClick={handleClick}>{roomAlias}</button>
    )
}
export default App
