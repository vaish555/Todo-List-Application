import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "../css/Profile.css"

function Profile() {
  let { username } = useParams();
  let registeredUsers = JSON.parse(localStorage.getItem('Registerdetails')) || [];
  let userDetails = registeredUsers.find((user) => {
    return user.Fullname == username;
  })

  let [userData,setUserData]=useState(userDetails);

  let [isUpdated,setUpdate]=useState(false);

  let [isdisabled,setDisabled]=useState(true);

  let handleDisable=()=>{
    setDisabled(false);
    input.isDisabled=isdisabled;
  }

  let handleInputValue=(e)=>{
     let {name,value}=e.target;
     setUserData((prevData)=>{
      return {...prevData,[name]:value}
     })

  }
  let saveData=()=>{

       let registeredUsers=JSON.parse(localStorage.getItem('Registerdetails')) || [];
       let filteredUsers=registeredUsers.filter((user)=>{
        return user.Fullname!==username

       })
       filteredUsers.push(userData);
       localStorage.setItem('Registerdetails',JSON.stringify(filteredUsers));
       setUpdate(true);
       setUserData("");
       
  }

  return (
    <div className='profile-container'>
      <div className='title'>
        <h1>Profile Details</h1>
      </div>
      <div className='details'>
        <label htmlFor="">Fullname</label>       
        <input type="text" disabled={isdisabled} name='Fullname' value={userData.Fullname} onChange={handleInputValue}/>

        <label htmlFor="">Email-ID</label>
        <input type="email" disabled={isdisabled} name='Email' value={userData.Email} onChange={handleInputValue}/>

        <label htmlFor="">Mobile Number</label>
        <input type="tel" disabled={isdisabled} name='Mobile' value={userData.Mobile} onChange={handleInputValue}/>

        <label htmlFor="">Password</label>
        <input type="password" disabled={isdisabled} name='Password' value={userData.Password} onChange={handleInputValue}/>  
      </div>
      <button onClick={handleDisable}>Edit Profile</button>
      <button onClick={saveData}>Save</button>

      <h2 style={{color:"green"}}>{isUpdated && "Profile updated successfully"}</h2>

    </div>
  )
}

export default Profile
