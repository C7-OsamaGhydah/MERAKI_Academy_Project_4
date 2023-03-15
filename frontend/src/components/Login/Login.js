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
const [classNameinpute,setclassNameinpute]=useState("login-input")
const [classNameinputp,setclassNameinputp]=useState("login-input")

const [emailerr,setemailerr]=useState("")
const [passworderr,setpassworderr]=useState("")


const login_input_email =(e)=>{
    setemail(e.target.value)
}

const login_input_password =(e)=>{
    setpassword(e.target.value)
    
}
const login_button =(e)=>{
  if(password.length<8){
    console.log("hi osama")
setpassworderr("The password you entered is very short, it must contain at least 8 characters")
setclassNameinputp("login-input-err")
setclassNamebutton("login-button-err")
return
}if(!email.includes("@")||!email.includes(".")){
setemailerr("The email you entered is incorrect or not available. Please try again")
setclassNameinpute("login-input-err")
setclassNamebutton("login-button-err")
return
}



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
        navigate("/Home")
    }else{
        setErr(result.data.message)
        setclassNamebutton("login-button-err")
        setclassNameinpute("login-input-err")
        setclassNameinputp("login-input-err")
    }
        
     }).catch((err)=>{
        setErr("email or password is not correct")
        setclassNamebutton("login-button-err")
        setclassNameinpute("login-input-err")
        setclassNameinputp("login-input-err")
     })
}


return(<div className="Login">
    <div className="login-pop">
    <h3 style={{alignSelf:"center"}}>Login</h3>
    <div style={{alignSelf:"flex-start"}}>
    <hr></hr>
    </div>
    <Input msg={err?"It must contain the @ sign and .something":emailerr?emailerr:""} type="email" value={email} fun={login_input_email} className={classNameinpute} text="Email"/>
    <Input msg={err?"It must contain at least 8 characters":passworderr?passworderr:""} type="password" value={password} fun={login_input_password} className={classNameinputp} text="Password"/>
    <br></br>
    <Button style={{alignSelf:"center"}} fun={login_button} className={classNamebutton} text="login"/>

    <p style={{margin:"10px"}}>{err?err:""}</p>
    </div>
    </div>
)

}


export default Login;

{/* <div className="Login">
    <div className="login-pop">
    <h3 style={{alignSelf:"center"}}>Login</h3>
    <hr></hr>
    <Form.Group  style={{width: "90%"}} value={email} onChange={login_input_email} className="mb-3 {classNameinput}" controlId="formBasicEmail">
        <label style={{alignSelf: "flex-start",justifySelf:"flex-start"}}>Email</label>
        <Form.Control type="Email" placeholder="Add Email" />
      </Form.Group>
      <Form.Group style={{width: "90%"}} value={password} onChange={login_input_password} className="mb-3 {classNameinput}" controlId="formBasicEmail">
      <label style={{alignSelf: "flex-start"}}>password</label>
        <Form.Control type="password" placeholder="Add Password" />
      </Form.Group>
      <Form.Group style={{alignSelf: "flex-start",marginLeft:"10px"}} className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button onClick={login_button} className={classNamebutton} type="login">
        Submit
      </Button>
    <p style={{margin:"10px"}}>{err?err:""}</p>
    </div>
    </div> */}
