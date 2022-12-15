// import logo from './logo.svg';
import './App.css';
import { v4 as uuidv4 } from "uuid";
import {useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  const [textField, setName] = useState(" ");
  const [isCreateNew, setisCreateNew] = useState(false);
  const [data, setData] = useState([]);
  const [isChangedInData, setDataChange] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8000/tasks").then((res) => {
      return res.json()
    }).then((resp) => {
      console.log("Resp");
      console.log(resp);
      setData(resp);
      console.log("Data");
      console.log(data);
    })
  }, [isChangedInData])
  const handleInput = event => {
    setName(event.target.value);
  };

  const Onsubmited = () => {
    const data = {
      "id": uuidv4(),
      "task": textField
    }
    fetch("http://localhost:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        alert("Added Successfully.")
        setisCreateNew(false);

        setDataChange(!isChangedInData);
      });
  };
  const navigate = useNavigate();
  async function deleteTask (id)  {
    await fetch("http://localhost:8000/tasks/"+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then()
      .then(result => {
        alert("Deleted Successfully.")
        setisCreateNew(false);

        setDataChange(!isChangedInData);
      });
  } 
  return (
    <div className='justify-content-center align-items-center'>
      <h1>To-Do App</h1>
      {isCreateNew ?
        (<form className='form-inline'>
          <div className='form-group'><input onChange={handleInput} placeholder="Enter Your Task" /></div>
          <button className="btn btn-danger" onClick={() => { setisCreateNew(!isCreateNew); }}>Close</button>
          <button className="btn btn-success" onClick={Onsubmited}>Submit</button>
          </form>)
        :
        (<button className='btn btn-success' onClick={() => { setisCreateNew(!isCreateNew) }}>Create New Task</button>)
      }
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <td>id</td>
            <td>Task</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map(d => (
              <tr>
                <td>{d.id}
               </td>
                <td><p>{d.task}</p>
                <button className='btn btn-primary' onClick={()=> {
                  console.log("/taskupdate/"+d.id)
                  navigate("/taskupdate/"+d.id+"/"+d.task)
                  }}>Edit</button>
                <button className='btn btn-danger'onClick={() => {deleteTask(d.id)}}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
