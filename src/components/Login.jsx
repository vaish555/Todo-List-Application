import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"


function Login() {
  let navigate_to_dashboard=useNavigate()
  let [email,setEmail]=useState("");
  let [pass,setPass]=useState("");

  let [emptyField,setEmptyField]=useState("");
  let [usernotFound,setUserNotFound]=useState(false);
  let [alert,setAlert]=useState(false);
  let [InvalidPass,setInvalidPass]=useState(false);
  
  let handleLogin=(e)=>{
    e.preventDefault()
      let RegisterdUsers=JSON.parse(localStorage.getItem('Registerdetails')) || [];
      console.log(RegisterdUsers);
      let user=RegisterdUsers.find((registeredUser,index)=>{
            return registeredUser.Email===email;
      
      })
      if(!email || !pass ){
       setEmptyField(true);
      }
      else if(!user){
      setUserNotFound(true)
      }
      else if(user.Password===pass){
           
            let userDetails={
              "Email":email,
              "Password":pass
            }
            let LoggedUser=JSON.parse(localStorage.getItem('LoggedUser')) || [];
            LoggedUser.push(userDetails);
            localStorage.setItem('LoggedUser',JSON.stringify(LoggedUser));
            setAlert(true);
            navigate_to_dashboard(`/dashboard/${user.Fullname}`);

      }
      else{
           setInvalidPass(true)
      }
  }
  return (
    <>
      <form action="" onSubmit={handleLogin} className='login-container'>
        <h1>Login Form</h1>
        <input type="email" placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}}/><br />
        <input type="password" placeholder='Enter your password'  onChange={(e)=>{setPass(e.target.value)}}/><br />
         <h4 style={{color:"red"}}>{usernotFound? "User with entered Email-id Not Found":null}</h4>
         <h4 style={{color:"red"}}>{InvalidPass? "Invalid Password":null}</h4>
         <h4 style={{color:"red"}}>{emptyField? "Fill all the fields":null}</h4>
         <h4 style={{color:"green"}}>{alert? "LOGIN SUCCESSFULL":null}</h4>
        <button>Login</button>
      </form>
    </>
  )
}

export default Login
