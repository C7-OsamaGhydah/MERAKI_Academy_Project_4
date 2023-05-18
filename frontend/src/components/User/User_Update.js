import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Img from "./Img"
import Select from "../Select/Select"








const User_Update=({setUser}
)=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")
const [show_Update, setShow_Update] = useState(false)

const [phoneNumber, setPhoneNumber] = useState(undefined)
const [firstName, setFirstName] = useState(undefined)
const [lastName, setLastName] = useState(undefined)
const [city, setCity] = useState(undefined)
const [country, setCountry] = useState(undefined)
const [image,setimage]=useState(undefined)





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

const register_input_country =(e)=>{
  setCountry(e.target.value)
}

const update=(e)=>{
      axios.put(`${process.env.REACT_APP_BACKEND}/users/update/${value.token._id}`,{
      phoneNumber,
      firstName,
      lastName,
      city,
      country,
      image},{
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          setUser(result.data.result)
          setUser([])
        })
        .catch((err) => {
          console.log(err.message)
          setErr("user is not defind")
        })
    
}



  const updateFunction = () => {
        return (
      <div style={{borderRadius: "7px",border:"1px solid black"}}>
        <Form.Group style={{width: "90%"}} value={firstName} onChange={user_input_firstName} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="Add firstNam" />
        </Form.Group>
        <Form.Group style={{width: "90%"}} value={lastName} onChange={user_input_lastName} className="mb-3 user-input">
          <Form.Label >update lastName</Form.Label>
          <Form.Control  placeholder="Add lastName" />
        </Form.Group>
        <Form.Group style={{width: "90%"}} value={phoneNumber} onChange={user_input_phoneNumber} className="mb-3 user-input">
          <Form.Label >update phoneNumber</Form.Label>
          <Form.Control  placeholder="Add phoneNumber" />
        </Form.Group>
        <Form.Group style={{width: "90%"}} value={city} onChange={user_input_city} className="mb-3 user-input">
          <Form.Label >update city</Form.Label>
          <Form.Control  placeholder="Add city" />
        </Form.Group>
        <label>country :</label>
        <br></br>
<Select value={country} fun={register_input_country} className={"register-input"} text="Country" />
<br></br>
<label>image :</label>
<Img image={image} setimage={setimage}/>
        <Button className="user-button" value={value.token._id} onClick={update} type="submit">Submit</Button>
      </div>)
  }



return(<div className="user-pop-top">
    {updateFunction()}
    </div>
)

}


export default User_Update;

