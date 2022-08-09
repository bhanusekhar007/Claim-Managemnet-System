import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login'
//import NotFound from './Pages/NotFound'
import Register from './Pages/Register'
import UserHome from './Pages/UserHome'
import AboutUs from './Pages/AboutUs'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import ViewClaims from './Pages/ViewClaims';
import AdminHome from './Pages/Admin/AdminHome';
import AcceptedClaims from './Pages/Admin/AcceptedClaims';
import PendingClaims from './Pages/Admin/PendingClaims';
import RejectedClaims from './Pages/Admin/RejectedClaims';


function App() {

  const [userId,setuserId] = useState('');
  const [jwtToken,setjwtToken] = useState('');
  const [role,setrole] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('userId');
    const jwt = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');
    setuserId(user);
    setjwtToken(jwt);
    setrole(role);
  },[role])

  return (
    <>
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" className=" px-2 py-2"  expand="lg">
        {
            (userId != null && jwtToken != null && role === 'ROLE_USER') && <Navbar.Brand href="/userhome">AutoClaim</Navbar.Brand> 
        }

        {
            (userId != null && jwtToken != null && role === 'ROLE_ADMIN') && <Navbar.Brand href="/adminhome">AutoClaim</Navbar.Brand> 
          
        }

        {
          (userId === null && jwtToken === null && role === null) && <Navbar.Brand href="/">AutoClaim</Navbar.Brand> 
       
        }
        <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="mr-auto">
           
           <Nav.Link href='/aboutus'>About Us</Nav.Link>
         </Nav>
       </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route exact path="/userhome" element={<UserHome />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/acceptedclaims" element={<AcceptedClaims />} />
        <Route path="/pendingclaims" element={<PendingClaims />} />
        <Route path="/rejectedclaims" element={<RejectedClaims />} />
        <Route path="/ViewClaims" element={<ViewClaims  />} />
      </Routes>
      
    </BrowserRouter>
    
    {/* <footer>
    <Navbar bg="dark" variant="dark" className="nav-bar nav-bottom justify-content-center px-2 py-2 text-white"  expand="lg">
      
      
      <p className="text-center my-2">For any queries, contact us by writing to abc@gmail.com</p>
      
    </Navbar>
    </footer> */}
    </>
  );
}
export default App;