import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';








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
      <div className="user-pop-update">
        <Form.Group value={firstName} onChange={user_input_firstName} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="update firstNam" />
        </Form.Group>
        <Form.Group value={lastName} onChange={user_input_lastName} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="update lastName" />
        </Form.Group>
        <Form.Group value={phoneNumber} onChange={user_input_phoneNumber} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="update phoneNumber" />
        </Form.Group>
        <Form.Group value={city} onChange={user_input_city} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="update city" />
        </Form.Group>
        <Form.Group value={country} onChange={user_input_country} className="mb-3 user-input">
          <Form.Label >update firstNam</Form.Label>
          <Form.Control  placeholder="update country" />
        </Form.Group>
        <Button className="user-button" value={value.token._id} onClick={update} type="submit">Submit</Button>
      </div>)
  }

  const button_Show_Update =()=>{
    setShow_Update(!show_Update)
  }


return(<div className="user-pop-top">
    {updateFunction()}
    </div>
)

}


export default User_Update;

