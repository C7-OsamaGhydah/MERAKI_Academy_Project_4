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
import Select from "../Select/Select";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const NavbaR=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();


const [types,setTypes]=useState([])
const [country,setcountry]=useState(undefined)






useEffect(()=>{
  if(JSON.parse(localStorage.getItem('token'))){
      axios.get("http://localhost:5000/types",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
      setTypes(result.data.result)
  }).catch((err)=>{
      console.log(err.message)
  })
  }
  
},[types])



const typesFunction=()=>{
  return types.map((type)=>{
      return (
          <NavDropdown.Item onClick={type_input} key={type._id} id={type._id}>{type.type}</NavDropdown.Item>
          )
  })
}

const type_input =(e)=>{
  console.log(e.target.id)
  value.setItem([])
  value.settypeForSearch(e.target.id)
  value.setcountryForSearch(undefined)

}

const login =()=>{
  value.sethome(false)
navigate("/login")
}
const register =()=>{
  value.sethome(false)
    navigate("/register")
}

const AddItem =()=>{
value.sethome(false)
    navigate("/AddItem")
}


const logout =()=>{
value.sethome(false)
    localStorage.removeItem('token')
    value.setisLoggedIn((loggedIn)=>!loggedIn)
    value.setToken((token)=>token=null)

    navigate("/Login")
}


const Home =()=>{
  value.setcountryForSearch(undefined)
value.sethome(true)
  value.settypeForSearch(undefined)
  value.setItem([])
navigate("/Home")
}


const Main =()=>{
  value.sethome(false)
  navigate("/")
  }


const Favorite =()=>{
  value.sethome(false)
    navigate("/Favorite")
    }


    const register_input_country =(e)=>{
      setcountry(e.target.value)
  }
    
    
const myProfile =()=>{
  value.sethome(false)
        value.setUser_Id(value.token._id)
        navigate("/User")
    }

    const fun5 =()=>{
      value.setItem([])
      console.log(country)
  value.setcountryForSearch(country)
  value.settypeForSearch(undefined)

    }

return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/Home"><span style={{color:" #fedc47",fontSize:"larger"}}>X</span>changeez</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {value.loggedIn?
            <Nav.Link style={{color:" #fedc47"}} onClick={Home}>Home</Nav.Link>:
            <Nav.Link style={{color:" #fedc47"}} onClick={Main}>Main</Nav.Link>
            }
           

            {value.loggedIn?
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={Favorite}>Favorite</NavDropdown.Item>
              <NavDropdown.Item onClick={myProfile}>My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={AddItem}>Add Item</NavDropdown.Item>
              <NavDropdown.Item onClick={AddItem}>contact us</NavDropdown.Item>
            </NavDropdown>:""}
            {value.loggedIn?value.home?
            <Nav.Link style={{color:" #fdf8f5"}} onClick={logout}>Logout</Nav.Link>:"":""
            }
          </Nav>
          <Nav>
          
            {value.loggedIn&&value.home?
            <NavDropdown title="type" id="collasible-nav-dropdown">
              {typesFunction()}
            </NavDropdown>:""}
          </Nav>
          
          {value.home?<><Select value={country} fun={register_input_country} className="navbar-input" text="Country" />
            <Button  onClick={fun5} variant="outline-warning">Search</Button></>:""}
          
          <Nav>
          {value.loggedIn?value.home?"":<Nav.Link style={{color:" #fdf8f5"}} onClick={logout}>Logout</Nav.Link>:
          <>
          <Nav.Link style={{color:" #fdf8f5"}} onClick={login}>Login</Nav.Link>
          <Nav.Link style={{color:" #fdf8f5"}} onClick={register}>Register</Nav.Link>
          </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbaR;

