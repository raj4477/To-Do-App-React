import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskUpdatePage from './TaskUpdatePage';
import Demo from './demo';
import App from './App';
export default function MainApp(){
    return(
        <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App/>}></Route>
      <Route path="/taskupdate/:id/:task" element={<TaskUpdatePage/>}></Route>
      <Route path="/demo" element={<Demo/>}></Route>

   
    </Routes>
    
    </BrowserRouter>
    )
}