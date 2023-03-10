import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import Input from "../Input/Input"
import Button from "../Button/Button"
import axios from "axios";








const User_Update=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")
const [user, setUser] = useState([])
const [show_Update, setShow_Update] = useState(false)

const [phoneNumber, setPhoneNumber] = useState(undefined)
const [firstName, setFirstName] = useState(undefined)
const [lastName, setLastName] = useState(undefined)
const [city, setCity] = useState(undefined)
const [country, setCountry] = useState(undefined)

// let {
//   phoneNumber,
//   firstName,
//   lastName,
//   city,
//   country}=""




const user_input_country =(e)=>{
  setCountry(e.target.value)
}
const user_input_city =(e)=>{
  setCity(e.target.value)

}
const user_input_lastName =(e)=>{
  setLastName(e.target.value)
}
const user_input_firstName =(e)=>{
  setFirstName(e.target.value)
}
const user_input_phoneNumber =(e)=>{
  setPhoneNumber(e.target.value)
}

const update=(e)=>{
console.log({
  phoneNumber,
  firstName,
  lastName,
  city,
  country})
      axios.put(`http://localhost:5000/users/update/${value.token._id}`,{
      phoneNumber,
      firstName,
      lastName,
      city,
      country},{
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
    
}



  const updateFunction = () => {
        return (
      <div className="user-pop">
            <Input fun={user_input_firstName} value={firstName} className="user-input" text="update firstName" />
            <Input fun={user_input_lastName} value={lastName} className="user-input" text="update lastName" />
            <Input fun={user_input_phoneNumber} value={phoneNumber} className="user-input" text="update phoneNumber" />
            <Input fun={user_input_city} value={city} className="user-input" text="update city" />
            <Input fun={user_input_country} value={country} className="user-input" text="update country" />
        <Button
          value={value.token._id}
          fun={update}
          className="user-button"
          text="Update"
        />
        </div>)
  }

  const button_Show_Update =()=>{
    setShow_Update(!show_Update)
  }


return(<div className="User5">
    <Button
          value={value.token.token}
          fun={button_Show_Update}
          className="user-button"
          text="Update"
        />
    {show_Update?updateFunction():""}
    </div>
)

}


export default User_Update;

