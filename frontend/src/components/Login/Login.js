import "./Login.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"








const Login=()=>{

const user11 = useContext(AllContext);
const navigate = useNavigate();

const [user,setUser]=useState(null)
const [err,setErr]=useState("")

useEffect(()=>{

},[err])

let {email,password}=""

const login_input_email =(e)=>{
    email=e.target.value
}

const login_input_password =(e)=>{
    // if(e.target.value.length<8){
    //     setErr("password very short")
    //     return
    // }else{
        
    // }
    password=e.target.value
}
const login_button =(e)=>{
    // setUser({email,password})
    console.log({email,password})
}


return(<div className="Login">
    <h1>Login</h1>
    <Input fun={login_input_email} className="login-input" text="email"/>
    {err?<Paragraph text={err} />:""}
    <Input fun={login_input_password} className="login-input" text="password"/>
    <Button fun={login_button} className="login-button" text="login"/>
    </div>
)

}


export default Login;

