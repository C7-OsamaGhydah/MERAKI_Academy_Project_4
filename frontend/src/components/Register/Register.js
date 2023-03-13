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
const [showMore,setShowMore]=useState(false)

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
        setErr("All fields are required")
        setclassNamebutton("login-button-err")
        setclassNameinput("login-input-err")
     })
    
}

const ShowMore =()=>{
    setShowMore(!showMore)
}


return(<div className="Register">
    <div className="register-pop">
    <h3>Register</h3>
    <Input msg={err?"It must contain at least 3 characters":""} value={firstName} type="text" fun={register_input_firstName} className={classNameinput} text="firstName"/>
<Input  msg={err?"It must contain at least 3 characters":""} value={lastName} type="text" fun={register_input_lastName} className={classNameinput} text="lastName"/>
<Input  msg={err?"It must contain the @ sign and .something":""} value={email} type="email" fun={register_input_email} className={classNameinput} text="email"/>
<Input  msg={err?"It must contain at least 8 characters":""} value={password} type="password" fun={register_input_password} className={classNameinput} text="password"/>
<Button fun={ShowMore} className="register-button" text="Show More"/>
<p className="msg">This information is important to get a good use experience.</p>
<p className="msg">You can fill it in now, or you can postpone this.</p>
<p className="msg">To view, click on Show More</p>
{showMore?
<>
<label>country :</label>
<Select value={country} fun={register_input_country} className={"register-input"} text="country" />
<Input value={city} type="text" fun={register_input_city} className={"register-input"} text="city"/>
<Input value={phoneNumber} type="phoneNumber" fun={register_input_phoneNumber} className={"register-input"} text="phoneNumber"/>
</>:""}

    <Button fun={register_button} className={classNamebutton} text="register"/>

    
    <p>{err?err:""}</p>
    </div>
    </div>
)
}


export default Register;

