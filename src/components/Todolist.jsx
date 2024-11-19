import React, { useRef, useState } from 'react'
import "../css/Todolist.css"

function Todolist() {
   let [task,setTask]=useState("");


   let [taskArray,setTaskArray]=useState([]);

   let [toggle,setToggle]=useState({"visible":false,"id":""});

    let taskRef=useRef(null);
    
   let addTask=()=>{
      let TaskList=JSON.parse(localStorage.getItem('TaskList')) || [];
      TaskList.push(task);
      localStorage.setItem('TaskList',JSON.stringify(TaskList));
      setTaskArray(TaskList);
      setTask("")
   }   

   let deleteTask=(index)=>{
      let TaskList=JSON.parse(localStorage.getItem('TaskList')) || [];
      let removeTask=TaskList.filter((task,ind)=>{
        return ind!==index
      });
      localStorage.setItem('TaskList',JSON.stringify(removeTask));
      setTaskArray(removeTask);
   }

   let EditTask=(index)=>{
         taskRef.current.focus();
         let taskTobeUpdated=taskArray.find((task,ind)=>{
          return ind==index;
         })
         setTask(taskTobeUpdated);
         setToggle({visible:true,id:index});
         
   }

   let saveTask=()=>{
      let TaskList=JSON.parse(localStorage.getItem('TaskList')) || [];
      let taskUpdate=TaskList.filter((task,index)=>{
        return toggle.id!==index;
      });
      taskUpdate.splice(toggle.id,0,task);
      localStorage.setItem('TaskList',JSON.stringify(taskUpdate));
      setTaskArray(taskUpdate);
      setToggle({visible:false});
      setTask("")
   }
  return (
    <div className='todolist-container'>
      
      <h1 className='head'>TODO List</h1>
      <div className='input-field'>
        <input type="text" placeholder='Enter your daily task here' onChange={(e)=>{setTask(e.target.value)}} ref={taskRef} value={task}/>
      <button onClick={addTask}>Add Task</button>
      {
        toggle.visible && <button onClick={saveTask}>Save Task</button>
      }
      </div>
      

      <ol className='list-task'>
        {
          taskArray.map((task,index)=>{
            return <li>{task} <button onClick={()=>{deleteTask(index)}}>Delete Task</button> <button onClick={()=>{EditTask(index)}}>Edit Task</button></li>
          })
        }
      </ol>

    </div>
  )
}

export default Todolist
