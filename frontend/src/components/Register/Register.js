import "./Register.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Select from "../Select/Select"
import axios from "axios";









const Register=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [user,setUser]=useState(null)
const [err,setErr]=useState("")

useEffect(()=>{
if(user){
    axios.post("http://localhost:5000/users/registr",user).then((result)=>{
        console.log(result.message)
        navigate("/login")
     }).catch((err)=>{
        console.log(err.message)
     })
    }
},[user])

let {email,
    password,
    phoneNumber,
    firstName,
    lastName,
    city,
    country,
role}=""


role = value.role

const register_input_email =(e)=>{
    email=e.target.value
}

const register_input_password =(e)=>{
    password=e.target.value
}

const register_input_firstName =(e)=>{
    firstName=e.target.value
}

const register_input_lastName =(e)=>{
    lastName=e.target.value
}

const register_input_phoneNumber =(e)=>{
    phoneNumber=e.target.value
}

const register_input_city =(e)=>{
    city=e.target.value
}

const register_input_country =(e)=>{
    country=e.target.value
}
const register_button =(e)=>{
    console.log({email,
        password,
        phoneNumber,
        firstName,
        lastName,
        city,
        country,
    role})
}


return(<div className="Register">
    <h1>Register</h1>
    <Input type="text" fun={register_input_firstName} className="register-input" text="firstName"/>
<Input type="text" fun={register_input_lastName} className="register-input" text="lastName"/>
<Select fun={register_input_country} className="register-input" text="country" />
<Input type="text" fun={register_input_city} className="register-input" text="city"/>
<Input type="phoneNumber" fun={register_input_phoneNumber} className="register-input" text="phoneNumber"/>
<Input type="email" fun={register_input_email} className="register-input" text="email"/>
<Input type="password" fun={register_input_password} className="register-input" text="password"/>
    <Button fun={register_button} className="register-button" text="register"/>
    </div>
)
}


export default Register;


// <form className="Register">
// <Input type="text" fun={register_input_firstName} className="register-input" text="firstName"/>
// <Input type="text" fun={register_input_lastName} className="register-input" text="lastName"/>
// <Select fun={register_input_country} className="register-input" text="country" />
// <Input type="text" fun={register_input_city} className="register-input" text="city"/>
// <Input type="phoneNumber" fun={register_input_phoneNumber} className="register-input" text="phoneNumber"/>
// <Input type="email" fun={register_input_email} className="register-input" text="email"/>
// <Input type="password" fun={register_input_password} className="register-input" text="password"/>
// <Input type="submit" fun={register_button} className="register-button" text="register"/>
// </form>