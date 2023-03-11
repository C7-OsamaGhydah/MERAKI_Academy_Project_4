import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";
import User_Update from "./User_Update"
import User_Item from "./User_Item"








const User=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")
const [user, setUser] = useState([])



useEffect(() => {
    if (value.user_Id) {
      axios.get(`http://localhost:5000/users/${value.user_Id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result)
          setUser(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
          setErr("user is not defind")
        })
    }else if (!value.user_Id){
        setErr("user is not defind")
    }
  }, [])

  const userFunction = () => {
    if(user){
        return (
      <div key={user._id} className="favorite-pop">
            <p>Name :{user.firstName}</p>
            <p>id :{user._id}</p>
            <p>phone Number : {user.phoneNumber}</p>
            <p>city : {user.city}</p>
            <p>country : {user.country}</p>
        </div>)
    }else{
        return <p>looding</p>
    }
    
        }

        console.log("value.user_Id   "+value.user_Id)
        console.log("value.token._id    "+value.token._id)

return(<div className="User">
    <h1>User</h1>
    {user?userFunction() :<p>{err}</p>}
    {value.user_Id==value.token._id?<User_Update/>:""}
    <User_Item/>
    </div>
)

}


export default User;

