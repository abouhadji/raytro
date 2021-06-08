import {useState} from 'react';
import Channel from '../Channel/Channel'
import SelectRoom from '../SelectRoom/SelectRoom';
import './Room.css';

import RoomContext from './RoomContext';

const Room = (props) => {

    const [room, setRoom] = useState('messages');
    


    return (
        
            <div className="chat">
                <SelectRoom signOut = {props.signOut} room = {room} setRoom = {setRoom}/>
                <Channel user={props.user} db={props.db} room = {room}/>
            </div>
        
        
    );
};

export default Room;