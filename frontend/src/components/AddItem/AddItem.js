import "./AddItem.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const AddItem=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [user,setUser]=useState(null)
const [err,setErr]=useState("")

useEffect(()=>{
if(user){
    axios.post("http://localhost:5000/users/login",user).then((result)=>{
        console.log(result.data)
        const storageToken ={token:result.data.token,_id:result.data.result._id}
        localStorage.setItem('token', JSON.stringify(storageToken))
        value.setisLoggedIn((loggedIn)=>!loggedIn)
        value.setToken(storageToken)

     }).catch((err)=>{
        console.log(err.message)
     })
    }
},[user])

let {email,password}=""

const login_input_email =(e)=>{
    email=e.target.value
}

const login_input_password =(e)=>{
    password=e.target.value
}
const login_button =(e)=>{
    setUser({email,password})
}


return(<div className="AddItem">
    <h1>AddItem</h1>
    {/* <Input fun={login_input_email} className="login-input" text="email"/>
    <Input fun={login_input_password} className="login-input" text="password"/>
    <Button fun={login_button} className="login-button" text="login"/> */}
    </div>
)

}


export default AddItem;

