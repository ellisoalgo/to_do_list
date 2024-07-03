import { useState } from "react";

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterTasks, setFilterTasks] = useState('');
 
  const handleInput =(ev)=>{
    setNewTask(ev.target.value);
  }

  const addInput = (ev) => {
    ev.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask('');
  }

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const handleFilter = (ev) => {
    setFilterTasks(ev.target.value)
  }

  //Render

  const renderTasks = () => {
    return tasks
      .filter((task) => {
        return task.toLowerCase().includes(filterTasks.toLowerCase());
      })
      .map((task, index) => {
        return (
          <li key={index} className="task">
              <div className="task_item">
                <h3 className="task_item-name">
                  {task}
                </h3>
                <button onClick={() => handleDelete(index)} className="task_item-button">Delete</button>
              </div>
            </li>
        )
      })
  }


  return (
    <>
    <header>
      <h1 className="header">To Do List</h1>
    </header>
      <section>
        <fieldset>
          <legend>Add new task</legend>
          <input type="text" placeholder="Add task" className="input" value={newTask} onChange={handleInput}/>
          <button type="submit" className="add" onClick={addInput}>Add</button>
        </fieldset>
        <fieldset>
          <legend>Find a task</legend>
          <input type="text" placeholder="filter tasks" className="filter" onChange={handleFilter}/>
        </fieldset>
      </section>
      <section className="tasks">
        <ul className="classlist"> {renderTasks()} </ul>
      </section>
      
    </>
  );
};

export default App;