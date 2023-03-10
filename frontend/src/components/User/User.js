import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const User=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")

useEffect(()=>{
if(user){
    axios.post("http://localhost:5000/users/login",user).then((result)=>{
        console.log(result.data)
        const storageToken ={token:result.data.token,_id:result.data.result._id}
        localStorage.setItem('token', JSON.stringify(storageToken))
        value.setisLoggedIn((loggedIn)=>!loggedIn)
        value.setToken(storageToken)
        navigate("/")
     }).catch((err)=>{
        console.log(err.message)
     })
    }
},[user])



return(<div className="User">
    <h1>User</h1>
    </div>
)

}


export default User;

