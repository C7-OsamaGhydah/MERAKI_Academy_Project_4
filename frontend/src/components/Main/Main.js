import "./Main.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import axios from "axios";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';








const Main=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();




const login =()=>{
  value.sethome(false)
navigate("/login")
}
const register =()=>{
  value.sethome(false)
    navigate("/register")
}


const Home =()=>{
  value.setcountryForSearch(undefined)
value.sethome(true)
  value.settypeForSearch(undefined)
  value.setItem([])
navigate("/Home")
}

return(<div className="main-pop-top">
        <Image className="main-img-pop" src="https://res.cloudinary.com/dy9hkpipf/image/upload/v1679094338/qhoy5uebhbydbvvsmp5t.png" alt="Girl in a jacket"/>
    <div className="main-info-pop">
    <h1><span style={{color:" #fedc47",fontSize:"larger"}}>X</span>changeez</h1>
    <hr></hr>
    <br></br>
    <p style={{fontSize:"larger"}}>The largest site in the Middle East for the exchange of items.</p>
    <br></br>
    <br></br>
    <hr></hr>
    {value.loggedIn?<p style={{fontSize:"larger"}}>Welcome, you can start here</p>:<p style={{fontSize:"larger"}}>You can now try the site by registering or logging in.</p>}
    <br></br>
    {value.loggedIn?<Button style={{width:"200px"}} variant="warning" onClick={Home} >Home</Button> :<Button style={{width:"200px"}} variant="warning" onClick={login} >Login</Button> }
    {value.loggedIn?"":<p style={{marginTop:"16px"}}>OR</p>}
    {value.loggedIn?"":<Button style={{width:"200px"}} variant="warning" onClick={register} >Register</Button>}
    </div>
    </div>
)

}


export default Main;

