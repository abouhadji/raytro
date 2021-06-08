
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {useState, useEffect} from 'react';
import Channel from './components/Channel/Channel';
import Nav from './components/Nav/Nav'
import Form from './components/Connection/form'
import Room from './components/Room/Room'


firebase.initializeApp({
  
    apiKey: "AIzaSyCVcR0YPiQnbEFVOCUn1raqEZY_68WerVM",
    authDomain: "reactchat-d020b.firebaseapp.com",
    projectId: "reactchat-d020b",
    storageBucket: "reactchat-d020b.appspot.com",
    messagingSenderId: "979242015738",
    appId: "1:979242015738:web:ae5df3dba68faef78a2243"
  // Initialize Firebase

});


const auth = firebase.auth()
const db = firebase.firestore();


function App() {


  const [user, setUser] = useState(()=> auth.currentUser);
  const [initializing, setInitializing] = useState(true);


  const createUser =  (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  };


  const loginUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }; 
  
  


  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }

      if(initializing){
        setInitializing(false);
      }
    });

    return unsubscribe;
    
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try{
      await auth.signInWithPopup(provider);
    } catch(error){
      console.log(error);
    }
  };


  

  const signOut = async () => {
    
    try{
      await firebase.auth().signOut();

    }catch(error){
      console.log(error.message);
    }
  };

  if(initializing) return "loading...";

  

  return (
    <div className="App">
      {user?(
        <>
        
          <Room user={user} db={db} signOut = {signOut}/>
        </>
      ):(
          <Form signInWithGoogle={signInWithGoogle} createUser = {createUser} loginUser = {loginUser}/>
      )}

      
    </div>
  );
}

export default App;
