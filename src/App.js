
import './App.css';
import{React} from "react";
import { useState,  useEffect } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTrash, faAngleDown , faCircleArrowUp} from '@fortawesome/free-solid-svg-icons'
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';



function App() {

  const [task, settask] = useState([]);
  const [input, setinput] = useState('');
  const [completed, setcompleted] = useState([]);
  const [show, setshow] = useState(false);
  const today = new Date().toLocaleDateString('en-us',{
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const handleInput=(e)=>{
    
    if(input.trim()){
    

    const newtask ={
      name: input,
      id : Date.now(),
      completed:false
    };
    settask([...task, newtask]);
    setinput('');

  }
  }

  const deltask =(id)=>{
    const updatedlist = task.filter((todo)=> todo.id!==id);
    settask(updatedlist);

  }

  const toogletask= (id, namee)=>{

    const updatedlist = task.filter((todo)=>todo.id!==id);
    settask(updatedlist);

    const newcom ={
      id:Date.now(),
      name: namee
    }
    setcompleted([...completed, newcom]);
  };

  const delcompleted = (id)=>{
    const updatedlist = completed.filter((todo)=> todo.id!==id);
    setcompleted(updatedlist);
  }
  const handleEnter=(event)=>{
    if(event.key ==="Enter"){
      event.preventDefault();
      handleInput();

    }
  };
  const showcom ={
    height: show? '38%':'5%'
  }
  const showtask = {
    height: show? '30%':'68%'
  }
  return (
    <div className="App">
     
     {/* <h1> TO DO </h1> */}
     <h1 className='myday'>My Day</h1>
     <h3 className='date'>{today}</h3>
     <h2>Tasks</h2>
     <section className='tasks' style={showtask}>
      
      <ul className='taskul'>
      
         { task.map((tas)=>(
          <li key={tas.id}>
            <button className='btncomp' onClick={()=>toogletask(tas.id, tas.name)}>
            <FontAwesomeIcon icon={faCircleCheck} size="2xl" style={{color: "#ffffff",}} className='taskcompbtn'/>
              </button>
          {tas.name}
      
          <button className='btncomp' onClick={()=>deltask(tas.id)}>
          <FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#ffffff",}} />
          </button>
          </li>
         ))}
       
      </ul>
     </section>

     <div className='comphead'>
     <h1 className='h1comp'>Completed</h1> <button className='btncomp' onClick={()=>setshow(!show)}>
      {!show? <FontAwesomeIcon icon={faAngleDown} size="2xl" style={{color: "#d6d6d6",}} className='btnshow'/>: <FontAwesomeIcon className='btnshow' icon={faAngleDown} rotation={180} size="2xl" style={{color: "#d6d6d6",}} />}
     
     </button>
     </div>
   
     <section className='completed' style={showcom}>
      
      {show&& 
      <ul className='taskul'>
      
      { completed.map((comp)=>(
       <li key={comp.id}>
       
       {comp.name}
       <button className='btncomp' onClick={()=>delcompleted(comp.id)}>
       <FontAwesomeIcon icon={faTrash} size="xl" style={{color: "#ffffff",}} />
      
       </button>
       </li>
      ))}
    
   </ul>

      }
     </section>


     <div className='input-task'>
      <input className='input' maxLength={60} autoFocus type="text" placeholder="Enter task" value={input} onChange={(e)=>{setinput(e.target.value)}} 
      onKeyDown={handleEnter} ></input>
      <button type="submit" className='btncomp' onClick={handleInput} ><FontAwesomeIcon className='btnadd' icon={faCircleArrowUp} size="2xl"  /></button>

     </div>
    </div>
  );
}

export default App;