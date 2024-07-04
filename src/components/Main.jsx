import "../styles/Main.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import localStorage from '../services/localStorage';

const Main = () => {

    const [tasks, setTasks] = useState(["Shopping", "Swimming class", "Yoga", "Pick up parcel"]);
    const [newTask, setNewTask] = useState('');
    const [filterTasks, setFilterTasks] = useState('');
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(true);

    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.get('tasks')) || [];
      setTasks(storedTasks);
      const storedSelectedTasks = JSON.parse(localStorage.get('completed')) || [];
      setSelectedTasks(storedSelectedTasks);
    }, []);

    useEffect(() => {
      localStorage.set('tasks', JSON.stringify(tasks))
    }, [tasks]);

    useEffect(() => {
      localStorage.set('completed', JSON.stringify(selectedTasks))
    }, [selectedTasks]);
   
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

    const handleCheckbox = (e) =>{
      const checkedTask = e.target.value;
      if(e.target.checked){
        setSelectedTasks([...selectedTasks, checkedTask])
      } else {
        setSelectedTasks(selectedTasks.filter(id=> id !== checkedTask))
      }
    };

    const toggleCompleted = (ev) =>{
      ev.preventDefault();
      setShowCompleted(!showCompleted);
    }
  
    //Render
    const renderTasks = () => {
      return tasks
        .filter((task) => {
          return task.toLowerCase().includes(filterTasks.toLowerCase());
        })
        .filter(task => showCompleted || !selectedTasks.includes(task))
        .map((task, index) => {
          let completed = "";
          if (selectedTasks.includes(task)){
            completed = 'completed';
          } else{
            completed = "";
          }
          return (
            <li key={index} className="task">
                <div className="task_item">
                  <div className="task_item-taskcheck">
                    <input type="checkbox" value={task} checked={selectedTasks.includes(task)} onChange={(e) => {handleCheckbox(e)}}/>
                    <h3 className={`task_item-taskcheck-name ${completed}`}>{task}</h3>
                  </div>
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
            <div className="hideDone">
              <h3 className="hideDone_text">{showCompleted ? "Hide completed tasks" : "Show completed tasks"}</h3>
              <button className="hideDone_button" onClick={toggleCompleted}>{showCompleted ? <FontAwesomeIcon icon="fa-solid fa-eye" /> : <FontAwesomeIcon icon="fa-solid fa-eye-slash" />}</button>
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