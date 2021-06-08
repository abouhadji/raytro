import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import './Channel.css'
import Message from '../Message/Message'
import {useContext} from 'react';
import RoomContext from '../Room/RoomContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';




const Channel = ({user = null, db = null, room}) => {
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const contextValue = useContext(RoomContext);

    
    
    useEffect(()=>{
        if(db){
            const unsubscribe = db
            .collection(room)
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setMessages(data);
                console.log(data)
            });

            return unsubscribe;

        }  
    }, [db, room]);


    const HandleOnChange = e => {
        setNewMessage(e.target.value);
    };

    const HandleOnSubmit = e => {
       e.preventDefault();

       if(db){
            db.collection(room).add({
                text : newMessage,
                createdAt : firebase.firestore.FieldValue.serverTimestamp(),    
                uid : user.uid,
            });
       }
    };



   
    return (
        
            <div className='Channel'>
                <a href="#bottom" className="scrollBtn" >
                    <FontAwesomeIcon className="arrowDown"icon={faAngleDown}/>
                </a>
                <ul>
                    {messages.map(message => (
                        <li key={ message.id }>
                            <Message {...message} />
                        </li>
                    ))}
                </ul>
                <form onSubmit={HandleOnSubmit}>
                    <input 
                    type="text"
                    value={newMessage}
                    onChange={HandleOnChange}
                    placeholder="tapez votre message"/>
                    <button type="submit" disabled={!newMessage}>
                        Envoyer
                    </button>
                </form>
                <div id="bottom"/>
            </div>


    );
};

export default Channel;