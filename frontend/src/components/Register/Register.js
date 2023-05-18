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
import Img from "./Img"









const Register=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [user,setUser]=useState(null)
const [err,setErr]=useState("")
const [emailerr,setemailerr]=useState("")
const [passworderr,setpassworderr]=useState("")
const [showMore,setShowMore]=useState(false)

const [email,setemail]=useState(undefined)
const [password,setpassword]=useState(undefined)
const [phoneNumber,setphoneNumber]=useState(undefined)
const [firstName,setfirstName]=useState(undefined)
const [lastName,setlastName]=useState(undefined)
const [city,setcity]=useState(undefined)
const [country,setcountry]=useState(undefined)
const [image,setimage]=useState(undefined)
const [role,setrole]=useState(value.role)
const [classNamebutton,setclassNamebutton]=useState("register-button")
const [classNameinpute,setclassNameinpute]=useState("register-input")
const [classNameinputp,setclassNameinputp]=useState("register-input")




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
    if(password.length<8){
    setpassworderr("The password you entered is very short, it must contain at least 8 characters")
    setclassNameinputp("register-input-err")
    setclassNamebutton("register-button-err")
    return
    }if(!email.includes("@")||!email.includes(".")){
    setemailerr("The email you entered is incorrect or not available. Please try again")
    setclassNameinpute("register-input-err")
    setclassNamebutton("register-button-err")
    return
    }if(firstName!==undefined&&firstName.length<3){
        setclassNamebutton("register-button-err")
        setErr("firstName It must contain at least three fields")
        return
    }if(lastName!=undefined&&lastName.length<3){
        setclassNamebutton("register-button-err")
        setErr("lastName It must contain at least three fields")
        return
    }if(phoneNumber!=undefined&&phoneNumber.length<9){
        setclassNamebutton("register-button-err")
                setErr("phoneNumber It must contain at least nine fields")
        return
    }if(city!=undefined&&city.length<3){
        setclassNamebutton("register-button-err")
                setErr("city It must contain at least three fields")
        return
    }

    axios.post(`${process.env.REACT_APP_BACKEND}/users/registr`,{email,
    password,
    phoneNumber,
    firstName,
    lastName,
    city,
    country,
role,image:image}).then((result)=>{
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
        setErr("This email is linked to another account. Please choose another one")
        setclassNamebutton("register-button-err")
        setclassNameinputp("register-input-err")
        setclassNameinpute("register-input-err")
    
     })
    
}

const ShowMore =()=>{
    setShowMore(!showMore)
}


return(<div className="Register">
    <div className="register-pop">
    <h3>Register</h3>
    <hr></hr> 
<Input  msg={err?"It must contain the @ sign and .something":emailerr?emailerr:""} value={email} type="email" fun={register_input_email} className={classNameinpute} text="Email"/>
<Input  msg={err?"It must contain at least 8 characters":passworderr?passworderr:""} value={password} type="password" fun={register_input_password} className={classNameinputp} text="Password"/>
<Button fun={ShowMore} className="register-button" text="Show More"/>
<p className="msg">This information is important to get a good use experience.</p>
<p className="msg">You can fill it in now, or you can postpone this.</p>
<p className="msg">To view, click on Show More</p>
{showMore?
<>
<Input msg={"It must contain at least three fields"} value={firstName} type="text" fun={register_input_firstName} className={"register-input"} text="FirstName"/>
<Input msg={"It must contain at least three fields"}  value={lastName} type="text" fun={register_input_lastName} className={"register-input"} text="LastName"/>

<Input msg={"It must contain at least three fields"} value={city} type="text" fun={register_input_city} className={"register-input"} text="City"/>
<Input msg={"It must contain at least nine fields"} value={phoneNumber} type="phoneNumber" fun={register_input_phoneNumber} className={"register-input"} text="PhoneNumber"/>
<label>country :</label>
<Select value={country} fun={register_input_country} className={"register-input"} text="Country" />
<br></br>
<label style={{alignSelf:"flex-start"}}>image :</label>
<Img image={image} setimage={setimage}/>
</>:""}

    <Button fun={register_button} className={classNamebutton} text="register"/>

    
    <p>{err?err:""}</p>
    </div>
    </div>
)
}


export default Register;

