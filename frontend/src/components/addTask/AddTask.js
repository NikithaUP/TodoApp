import axios from 'axios';
import './AddTask.css';
import React, { useState } from 'react'

function AddTask(props) {
    const [task, setTask] = useState('');
    const addTaskBtn = () => {
        if (task.trim()==='') {
            return
        } else {
            axios.post(`${process.env.BASE_URL}/api/tasks`, {
                todo: task,
                isComplete:false
            }).then(res => {
                setTask('')
                props.addTask(res.data)
            }).catch(err=>console.log(err))
        }    
    }

  return (
      <div className='header'>
          <h1>My To-do List</h1>
          <div className='addtask'>
          <input type='text' placeholder='Add Task...' value={task} onChange={e=>setTask(e.target.value)} />
          <button onClick={()=>addTaskBtn()}>Add Task</button>
    </div>
    </div>
  )
}

export default AddTask
