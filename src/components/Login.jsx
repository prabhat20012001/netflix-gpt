import React,{ useState,useRef } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import { updateProfile } from "firebase/auth";

import Header from './Header'
import { checkValidData } from '../utils/validate'
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
// const navigate=useNavigate()
const dispatch=useDispatch()
    const [isSignInForm,setisSignInForm]=useState(true)
    const[errorMsj,setErrorMsj]=useState(null)
    const name=useRef(null)
      const email=useRef(null)
        const password=useRef(null)


        const handleSubmit = (e) => {
            e.preventDefault();
            const emailValue = email.current.value;
            const passwordValue = password.current.value;
            const nameValue = name.current.value;

            const message = checkValidData(emailValue, passwordValue,nameValue);
          
            if (message) {
              setErrorMsj(message);
              return; // Return early if there's an error message
            }
          
            if (!isSignInForm) {
              // Sign up logic
              createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                  // Signed up successfully
                  const user = userCredential.user;

                  updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/108868331?s=400&u=600ebdf8e6ce8b27151f3e0234e930be757d46dd&v=4"
                  }).then(() => {
                    // Profile updated!
                    // ...
                    const {uid,email,displayName,photoURL}= auth.currentUser;
                    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
                    // navigate("/browse")
                  }).catch((error) => {
                    // An error occurred
                    setErrorMsj(error.message)
                  });
                  
                  console.log(user);
                  // navigate("/")

                  // You might want to redirect the user to a different page upon successful sign up
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMsj(`${errorCode}-${errorMessage}`);
                });
            } else {
              // Sign in logic
              // Implement sign in logic here
              signInWithEmailAndPassword(auth, emailValue, passwordValue)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsj(`${errorCode}-${errorMessage}`);

  });

            }
          };
          


    const toggleForm=(e)=>{
setisSignInForm(!isSignInForm)
    }



  return (
    <div>
    <Header/>
    <div>
    <img className="absolute w-full " src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="headerImage" />
  </div>
  <form  onSubmit={(e)=>{e.preventDefault()}} action="" className='absolute p-12 bg-black w-3/12  my-36 right-0 left-0 mx-auto text-white rounded-lg bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4'>{isSignInForm?'Sign In':'Sign Up'}</h1>
    {!isSignInForm && (
          <input ref={name} type="text" id="name" placeholder="Full Name" className='p-2 m-2 w-full bg-black border-2 border-white'/>

    )}
  <input ref={email} type="text" id="contactInfo" placeholder="Email or phone number" className='p-2 m-2 w-full bg-black border-2 border-white'/>
  <input  ref={password} type="password" id="password" placeholder="Password" className='p-2 m-2 w-full bg-black border-2 border-white' />
  <p className='text-red-800 px-2'>{errorMsj}</p>
 
  <button className='w-full bg-red-800 m-2 p-2  my-6 rounded-lg' onClick={handleSubmit}>{isSignInForm?'Sign In':'Sign Up'} </button>
<p className='py-4 m-2 cursor-pointer'onClick={toggleForm}>{isSignInForm?'New to Netflix? Sign up now.':'Already a user Sign In now'}</p>
  </form>
    </div>
  )
}

export default Login
