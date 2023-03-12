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

const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [phoneNumber,setphoneNumber]=useState("")
const [firstName,setfirstName]=useState("")
const [lastName,setlastName]=useState("")
const [city,setcity]=useState("")
const [country,setcountry]=useState("")
const [role,setrole]=useState(value.role)
const [classNamebutton,setclassNamebutton]=useState("register-button")
const [classNameinput,setclassNameinput]=useState("register-input")




const register_input_email =(e)=>{
    setemail(e.target.value)
}
const register_input_password =(e)=>{
    setpassword(e.target.value)
}

const register_input_firstName =(e)=>{
    setfirstName(e.target.value)
}

const register_input_lastName =(e)=>{
    setlastName(e.target.value)
}

const register_input_phoneNumber =(e)=>{
    setphoneNumber(e.target.value)
}

const register_input_city =(e)=>{
    setcity(e.target.value)
}

const register_input_country =(e)=>{
    setcountry(e.target.value)
}

const register_button =(e)=>{

    axios.post("http://localhost:5000/users/registr",{email,
    password,
    phoneNumber,
    firstName,
    lastName,
    city,
    country,
role}).then((result)=>{
        console.log(result.message)
        setemail("")
setpassword("")
setphoneNumber("")
setfirstName("")
setlastName("")
setcity("")
setcountry("")
        navigate("/login")
     }).catch((err)=>{
        console.log(err.message)
        setErr("email or password is not correct")
        setclassNamebutton("login-button-err")
        setclassNameinput("login-input-err")
     })
    
}


return(<div className="Register">
    <div className="register-pop">
    <h3>Register</h3>
    <Input value={firstName} type="text" fun={register_input_firstName} className={classNameinput} text="firstName"/>
<Input value={lastName} type="text" fun={register_input_lastName} className={classNameinput} text="lastName"/>
<label>country :</label>
<Select value={country} fun={register_input_country} className={classNameinput} text="country" />
<Input value={city} type="text" fun={register_input_city} className={classNameinput} text="city"/>
<Input value={phoneNumber} type="phoneNumber" fun={register_input_phoneNumber} className={classNameinput} text="phoneNumber"/>
<Input value={email} type="email" fun={register_input_email} className={classNameinput} text="email"/>
<Input value={password} type="password" fun={register_input_password} className={classNameinput} text="password"/>
    <Button fun={register_button} className={classNamebutton} text="register"/>

    
    <p>{err?err:""}</p>
    </div>
    </div>
)
}


export default Register;

