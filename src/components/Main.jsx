import "../styles/Main.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Main = () => {

    const [tasks, setTasks] = useState(["Shopping", "Swimming class", "Yoga", "Pick up parcel"]);
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
    <div className="main">
      <section >
      <form className="main_form" >
        <fieldset className="main_form-fieldset">
            <div className="add-task">
              <input type="text" placeholder="Add task" className="input" value={newTask} onChange={handleInput}/>
              <button type="submit" className="add" onClick={addInput}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
            </div>
        </fieldset>
        <fieldset className="main_form-fieldset">
            <div className="filter-task">
              <input type="text" placeholder="Filter tasks" className="filter" onChange={handleFilter}/>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="search"/>
            </div>
        </fieldset>
    </form>
      </section>
      <section className="main_tasks">
        <ul className="main_tasks-list"> {renderTasks()} </ul>
      </section>
    </div>
  )
}

export default Main
library.add(fas)