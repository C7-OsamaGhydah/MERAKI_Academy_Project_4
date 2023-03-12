import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import "./Navbar.css";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




const NavbaR=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const login =()=>{
navigate("/login")
}
const register =()=>{
    navigate("/register")
}

const AddItem =()=>{
    navigate("/AddItem")
}


const logout =()=>{
    localStorage.removeItem('token')
    value.setisLoggedIn((loggedIn)=>!loggedIn)
    value.setToken((token)=>token=null)

    navigate("/Login")
}


const Home =()=>{
navigate("/")
}


const Favorite =()=>{
    navigate("/Favorite")
    }


    
    
const myProfile =()=>{
        value.setUser_Id(value.token._id)
        navigate("/User")
    }

// return(<div className="Navbar">
// <Paragraph className="paragraph"
// fun={Home}
// text="Home"/>

//     {value.loggedIn?
//     <>
//     <Paragraph className="paragraph"
// fun={AddItem}
// text="AddItem"/>
// <Paragraph className="paragraph"
// fun={logout}
// text="Logout"/>
// <Paragraph className="paragraph"
// fun={Favorite}
// text="Favorite"/>
// <Paragraph className="paragraph"
// fun={myProfile}
// text="My Profile"/>
// </>:<>
// <Paragraph className="paragraph"
// fun={login}
// text="Login"/>
// <Paragraph className="paragraph"
// fun={register}
// text="Register"/>
// </> 
// }
//     </div> 
// )
return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Xchngeez</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={Home}>Home</Nav.Link>
            {value.loggedIn?
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={Favorite}>Favorite</NavDropdown.Item>
              <NavDropdown.Item onClick={myProfile}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={AddItem}>Add Item</NavDropdown.Item>
              <NavDropdown.Item onClick={AddItem}>contact us</NavDropdown.Item>
            </NavDropdown>:""}
          </Nav>
          <Nav>
          {value.loggedIn?
          <Nav.Link onClick={logout}>Logout</Nav.Link>:
          <>
          <Nav.Link onClick={login}>Login</Nav.Link>
          <Nav.Link onClick={register}>Register</Nav.Link>
          </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbaR;

