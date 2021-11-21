import './App.css';
import initializeAuthentication from './FireBaseAuthentication/FireBase.initialize';
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';


initializeAuthentication();

const googleProvider = new GoogleAuthProvider();


function App() {

  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })

  }
  const handelEmailChange = e => {
    setEmail(e.target.value);
  }
  // console.log(email);
  const handelPasswordChange = e => {
    setPassword(e.target.value);
  }
  // console.log(password)
  const handelSubmitRegister = e => {
    // console.log('rigser button ');
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user);
      })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  }

  return (
    <div className="mx-3 my-3">
      <form onSubmit={handelSubmitRegister} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onBlur={handelEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onBlur={handelPasswordChange} type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Register </button>
      </form>


      <br /><br /><br />
      <div>----------------------------</div>
      <br /><br /><br /><br />
      <button onClick={handelGoogleSignIn}>Google Sign In </button>

    </div>
  );
}

export default App;
