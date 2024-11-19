import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../css/Dashboard.css"
import { VscThreeBars } from "react-icons/vsc";
import { RiContactsFill } from "react-icons/ri";
import { FcTodoList } from "react-icons/fc";

function Dashboard() {
  let [menu, setMenu] = useState(false);
  
  console.log(menu)
  let { username } = useParams();
  return (
    <div>
      <nav className='dashboard-navbar'>
        <VscThreeBars className='dashboard-icon' onClick={()=>{setMenu((prev)=>!prev)}} />
        <h1>Welcome {username}</h1>
        {
          menu?  (<div className='dashboard-menu'>
            <ul>
              <li>
              <RiContactsFill style={{fontSize:"30px"}}/> <Link to={`/profile/${username}`}>Profile</Link>
                </li>
              <li>
              <FcTodoList style={{fontSize:"30px"}}/> <Link to='/todolist'>TODO List</Link>
                </li>
            </ul>

          </div>):null         
        }

      </nav>
      <div className='background-todolist'>
        <img src="https://tse1.mm.bing.net/th?id=OIP.B7OMHBfYkxhqMsURr1e7WQHaE8&pid=Api&P=0&h=180" alt="" />
      </div>

    </div>
  )
}

export default Dashboard
