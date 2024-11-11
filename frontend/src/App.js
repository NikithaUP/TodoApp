import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AddTask from './components/addTask/AddTask';
import TodoList from './components/todoList/TodoList';
import UpdateTask from './components/updateTask/UpdateTask';

function App() {
  const [todolist, setTodolist] = useState([]);
  const [taskUpdate, setTaskUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'unfinished'

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}/api/tasks`)
      .then(res => setTodolist(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTask = newTask => setTodolist([...todolist, newTask]);

  const taskComplete = task => {
    const updatedList = todolist.map(item =>
      item._id === task._id ? { ...item, isComplete: task.isComplete } : item
    );
    setTodolist(updatedList);
  };

  const removeTask = task => setTodolist(todolist.filter(item => item._id !== task._id));

  const updatetask = task => {
    const updatedList = todolist.map(item =>
      item._id === task._id ? { ...item, todo: task.todo } : item
    );
    setTodolist(updatedList);
  };

  // Filter tasks based on the selected filter
  const filteredTasks = todolist.filter(task => {
    if (filter === 'completed') return task.isComplete;
    if (filter === 'unfinished') return !task.isComplete;
    return true; // 'all' filter shows all tasks
  });

  return (
    <div className="App">
      <AddTask addTask={addTask} />
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All Todos</button>
        <button onClick={() => setFilter('completed')}>Completed Todos</button>
        <button onClick={() => setFilter('unfinished')}>Unfinished Todos</button>
      </div>
      <TodoList
        todolist={filteredTasks}
        taskComplete={taskComplete}
        removeTask={removeTask}
        taskUpdate={task => setTaskUpdate(task)}
        showPopup={() => setShowPopup(!showPopup)}
      />
      {showPopup && (
        <UpdateTask
          task={taskUpdate}
          updatetask={updatetask}
          removePopup={() => setShowPopup(!showPopup)}
        />
      )}
    </div>
  );
}

export default App;
