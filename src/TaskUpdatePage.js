import { useParams,useNavigate } from 'react-router-dom';
import { useState } from "react";
import './task.css'
export default function TaskUpdatePage(){
    const [textField, setName] = useState(" ");
    const { id , task } = useParams();
    const navigate = useNavigate();
    const handleInput = event => {
        setName(event.target.value);
    
      };
   function editTask(){
    const data = {
        "id": id,
        "task": textField
      }
    fetch("http://localhost:8000/tasks/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(result => {
          
            alert("Updated Successfully.")
            navigate("/")
        });


    }
    return (
    <div className='center'>

    <h4>{id}</h4>
    <div className='inputClass'><input onChange={handleInput}
    defaultValue={task}
    placeholder="Enter Your Task" /></div>
    <button className='btn btn-danger' onClick={()=> {
                 
                  navigate("/")
                  }}>Cancel</button>
                <button className='btn btn-success'onClick={() => {
                    editTask();
                    }}>Save</button>
    </div>)
}


    /// [Editable Container in React]
    // <div >
    //         <div contenteditable="true" onInput={(e) => {
    //             console.log(e.currentTarget.textContent);
    //             editTask(id, e.currentTarget.textContent);
    //             }} >
    //             {id}
    //         </div>
    //     </div> 