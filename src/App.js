import React, { useEffect, useState } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';

import { useJitsi } from 'react-jutsu';

import './App.css';

const App = () => {
    const path = document.location.pathname.substring(1);
    const [roomPrefix, setRoomPrefix] = useState(path ? path : 'STM');
    const [initialRoomEntered, setInitialRoomEntered] = useState(false);
    const [showRoom, setShowRoom] = useState(false);
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const [displayName, setDisplayName] = useState('');

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const joinMeeting = (roomName) => {
        setShowRoom(false);
        setLoading(true);
        setInitialRoomEntered(true);
        delay(1000).then( () => {
            setRoom(
                <MyJutsu
                    roomName={roomName}
                    displayName={displayName}
                />
            );
            setLoading(false);
            setShowRoom(true);
        }
        )
    }

    const roomElems = [
        <StartButton
            key={1}
            roomName={roomPrefix}
            roomAlias='Starting Room'
            callBack={joinMeeting}/>
    ]
    const roomElems2 = []
    for (const x of Array(5).keys()) {
        roomElems2.push(
            <StartButton key={x}
                roomName={`${roomPrefix}/` + x}
                roomAlias={x}
                callBack={joinMeeting}/>
        )
    }

    return (
        <div>
            <div id="header" className="App-header">
                {
                    !initialRoomEntered ? (
                        <div>
                            <div>
                                <label>Group: </label>
                                <input value={roomPrefix} onChange={e => {setRoomPrefix(e.target.value)}} />
                            </div>
                            <div>
                                <label>Your Name: </label>
                                <input value={displayName} onChange={(e) => {setDisplayName(e.target.value) }}/>
                            </div>
                            <StartButton roomName={roomPrefix} roomAlias='Start Meeting' callBack={joinMeeting}/>
                        </div>
                    )
                    :  (
                        <div>
                            <div style={{textAlign: "center"}}>
                                {roomElems}
                            </div>
                            <div style={{textAlign: "center", marginBottom: "25px"}}>
                                {roomElems2}
                            </div>
                        </div>
                    )
                }
            </div>
            {loading && <ProgressComponent/>}
            <div>
                {showRoom && room}
            </div>
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

const MyJutsu = ({roomName, displayName }) => {
    const parentNode = 'jitsi-container';
    const height = window.innerHeight - document.getElementById('header').clientHeight;
    const jitsi = useJitsi({
        roomName,
        parentNode,
        height: height,
        configOverwrite: {prejoinPageEnabled: false}
    })

    useEffect(() => {
        if (jitsi) {
            jitsi.addEventListener('videoConferenceJoined', () => {
                jitsi.executeCommand('displayName', displayName)
                jitsi.executeCommand('subject', roomName)
            })
        }
        return () => jitsi && jitsi.dispose()
    }, [jitsi, displayName, roomName])

    return <div id={parentNode} />

}
export default App
