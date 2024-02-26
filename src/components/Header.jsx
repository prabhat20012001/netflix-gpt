import React, { useEffect } from 'react'
import {  onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
const handleSignout=()=>{
signOut(auth).then(() => {
  // Sign-out successful.
  // navigate("/")
}).catch((error) => {
  // An error happened.
  navigate("/error")

});
}
useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const {uid,email,displayName,photoURL}= user;
dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
navigate('/browse')
      // ...
    } else {
      // User is signed out
    dispatch(removeUser())
    navigate('/')


    }
  });
},[])


  return (
    <div className='absolute flex w-screen px-8 py-2 bg-gradient-to-b from-black justify-between z-10' >
      <img className='w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'/>
      <div className='flex p-2'>
      <img src={user?.photoURL} className="h-8 w-8" alt="user" />
      <button onClick={handleSignout} className='text-white font-bold px-2 h-8 bg-orange-300'>Sign Out</button>
    </div>
    </div>
  
  )
}

export default Header
