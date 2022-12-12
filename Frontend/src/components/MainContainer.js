import JobList from "./Job list";
import NavBar from "./NavBar";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import JobCreate from "./Job Create";
import JobEdit from "./Job Edit";
import JobDetails from "./Job details";
import Login from "./Login";
import Register from "./Register";
import {useEffect} from "react";
import Cookies from 'js-cookie';

const MainContainer = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/' element={<JobList/>}/>
                    <Route path='/create' element={<JobCreate/>}/>
                    <Route path='/view/:id' element={<JobDetails/>}/>
                    <Route path='/edit/:id' element={<JobEdit/>}/>
                </Routes>
            </div>
        </Router>
    )
}
export default MainContainer
