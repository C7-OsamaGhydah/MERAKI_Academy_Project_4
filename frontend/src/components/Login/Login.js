import "./Login.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const Login=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")

const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [classNamebutton,setclassNamebutton]=useState("login-button")
const [classNameinput,setclassNameinput]=useState("login-input")

const login_input_email =(e)=>{
    setemail(e.target.value)
}

const login_input_password =(e)=>{
    setpassword(e.target.value)
}
const login_button =(e)=>{
    axios.post("http://localhost:5000/users/login",{email,
    password}).then((result)=>{
        console.log(result.data.message)
        if(result.data.message!=="email or password is not correct"){
        const storageToken ={token:result.data.token,_id:result.data.result._id}
        localStorage.setItem('token', JSON.stringify(storageToken))
        setemail("")
        setpassword("")    
        value.setisLoggedIn((loggedIn)=>!loggedIn)
        value.setToken(storageToken)
        navigate("/")
    }else{
        setErr(result.data.message)
        setclassNamebutton("login-button-err")
        setclassNameinput("login-input-err")
    }
        
     }).catch((err)=>{
        setErr("email or password is not correct")
        setclassNamebutton("login-button-err")
        setclassNameinput("login-input-err")
     })
}


return(<div className="Login">
    <div className="login-pop">
    <h3>Login</h3>
    <Input type="email" value={email} fun={login_input_email} className={classNameinput} text="email"/>
    <Input type="password" value={password} fun={login_input_password} className={classNameinput} text="password"/>
    <Button fun={login_button} className={classNamebutton} text="login"/>

    <p>{err?err:""}</p>
    </div>
    </div>
)

}


export default Login;

