import React,{ useState,useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
const Login = () => {

    const [isSignInForm,setisSignInForm]=useState(true)
    const[errorMsj,setErrorMsj]=useState(null)
        const email=useRef(null)
        const password=useRef(null)


  
const handleSubmit = () => {
    const emailValue = email.current.value; // Access the value of email input
    const passwordValue = password.current.value; // Access the value of password input

    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);

    const message = checkValidData(emailValue, passwordValue); // Validate the form data
    console.log(message);
    setErrorMsj(message)
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
          <input type="text" id="name" placeholder="Full Name" className='p-2 m-2 w-full bg-black border-2 border-white'/>

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
