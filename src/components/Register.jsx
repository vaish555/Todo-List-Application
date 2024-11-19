import React, { useRef, useState } from 'react'
import "../css/Register.css"
import { useNavigate } from 'react-router-dom';
function Register() {
    let navigateToDashboard=useNavigate();

    let [fullname,setFullname]=useState("");
    let [email,setEmail]=useState("");
    let [mobile,setMobile]=useState("");
    let [pass,setPass]=useState("");
    let [confirmPass,setConfirmPass]=useState("");

    let fullnameRef=useRef(null);
    let emailRef=useRef(null);
    let mobileRef=useRef(null);
    let passRef=useRef(null);
    let confirmRef=useRef(null);

    let [emptyerror,setEmptyError]=useState(false);
    let [mobileError,setMobileError]=useState(false);
    let [nameError,setNameError]=useState(false);
    let [passError,setPassError]=useState(false);
     let alpha=/^[6-9][0-9]{9}$/;
     let validMobile=alpha.test(mobile);

    let formHandler=(e)=>{
        e.preventDefault();
        if(!fullname || !email || !mobile ){
           setEmptyError(true);
        }
        else if(!validMobile){
            setMobileError(true);
            mobileRef.current.focus()
        }
        else if(fullname.length<6  || fullname.length>15){
            setNameError(true);
            fullnameRef.current.focus()
        }
        else if(pass!=confirmPass){
            setPassError(true);
        }
        else{
            let userDetails={
                "Fullname":fullname,
                "Email":email,
                "Mobile":mobile,
                "Password":confirmPass
            }
            let Registerdetails=JSON.parse(localStorage.getItem('Registerdetails') )|| [];
            Registerdetails.push(userDetails);
            localStorage.setItem('Registerdetails',JSON.stringify(Registerdetails))  
            navigateToDashboard("/login") 
        }
        
    }

    return (
        <>
            <form action="" onSubmit={formHandler} className='register-container'>
                <h1>Register Form</h1>
                <input type="text" placeholder='Enter fullname' onChange={(e)=>{setFullname(e.target.value)}} ref={fullnameRef}/><br />
                <input type="email" placeholder='Enter Email-Id' onChange={(e)=>{setEmail(e.target.value)}} ref={emailRef}/> <br/>
                <input type="tel" placeholder='Enter your mobile number' onChange={(e)=>{setMobile(e.target.value)}} ref={mobileRef}/><br/>
                <input type="password" placeholder='Enter password' onChange={(e)=>{setPass(e.target.value)}} /><br/>
                <input type="password" placeholder='Re-enter the password' onChange={(e)=>{setConfirmPass(e.target.value)}} /><br/>
                <h4 style={{color:"red"}}>{emptyerror? "Please fill all the fields":null}</h4>
                <h4 style={{color:"red"}}>{mobileError? "Invalid mobile number":null}</h4>
                <h4 style={{color:"red"}}>{nameError? "Fullname must contain atleast of 6 character and can contain maximum of 15 character":null}</h4>
                <h4 style={{color:"red"}}>{passError? "Passowrd and Confirm password must be same":null}</h4>
                
                <button type='submit'>Register</button>
            </form>

        </>
    )
}

export default Register
