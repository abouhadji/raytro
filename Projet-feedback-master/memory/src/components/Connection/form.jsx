import {useState} from 'react';
import Button from '../Button/Button'
import './form.css';
import firebase from 'firebase/app';

const Form = (props) => {
    
    
    
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');


    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log(email)
    };

    const handleMdp = (e) => {
        console.log(mdp)
        setMdp(e.target.value);
    };

    const createAccount = () =>  {

        console.log(email, mdp);

        
        
        firebase.auth().createUserWithEmailAndPassword(email, mdp)
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


    return (



        <div className="Form">


            
            
            <form>
                <input type="text" placeholder="email" onChange={handleEmail}></input>
                <input type="text" placeholder="password" onChange={handleMdp}></input>
            </form>
            <button onClick={createAccount}>create account</button>
            <Button onClick={props.signInWithGoogle}>Sign in with Google</Button> 
        </div>
    );
};

export default Form;