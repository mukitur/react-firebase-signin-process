import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.init';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] =useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () =>{

    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App">
      <h2> Welcome to our site</h2>
      <button onClick ={handleGoogleSignIn}>Google Sign In</button>
      <br/>
      <button onClick={handleSignOut}>Sign Out</button>
      
      {
        user.name && <div>
        <h2>Welcome {user.name}</h2>
        <p>Your Email Address is: {user.email}</p>
        <img src={user.photo} alt="" />
      </div>
      }
    </div>
  );
}

export default App;
