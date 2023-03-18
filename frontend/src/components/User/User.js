import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import axios from "axios";
import User_Update from "./User_Update"
import User_Item from "./User_Item"
import AddItem from "./User_Additem"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';








const User=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")
const [user, setUser] = useState([])
const [update, setupdate] = useState(false)
const [item, setitem] = useState(false)
const [addItem, setaddItem] = useState(false)
const [classN, setclassN] = useState(false)



useEffect(() => {
    if (value.user_Id&&user.length===0) {
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
  }, [user])


  const userFunction = () => {
    if(user){
        return (
      <div key={user._id} className="user-pop-top">
        {user.image?
          <Image className="img-pop" src={user.image} alt="Girl in a jacket"/>
        :<div>no</div>}
        <div className="info-pop">
            <p className="user-p">Name :{user.firstName}</p>
            <p className="user-p">Last Name :{user.lastName}</p>
            <p className="user-p">phone Number : {user.phoneNumber}</p>
            <p className="user-p">city : {user.city}</p>
            <p className="user-p">country : {user.country}</p>
            </div>
        </div>)
    }else{
        return <p className="user-p">looding</p>
    }
    
        }

        
const showUpdate =(e)=>{
setupdate(!update)
setitem(false)
setaddItem(false)
}

const showAdditme =(e)=>{
  setupdate(false)
  setitem(false)
setaddItem(!addItem)
  }

const showItem =(e)=>{
setupdate(false)
setitem(!item)
setaddItem(false)

}

return(<div className="User">
  <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link  onClick={showItem} >Item</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      {value.user_Id==value.token._id?<Nav.Link  onClick={showUpdate} >Update</Nav.Link>:
      <Nav.Link eventKey="disabled" disabled>Update</Nav.Link>}
      </Nav.Item>
      <Nav.Item>
      {value.user_Id==value.token._id?<Nav.Link  onClick={showAdditme} >Add Item</Nav.Link>:
        <Nav.Link eventKey="disabled" disabled>Add Item</Nav.Link>}
      </Nav.Item>
    </Nav>
    {user?userFunction() :<p className="user-p">{err}</p>}
    <hr></hr>
    <div className="user-pop">
      {value.user_Id==value.token._id&&update?<User_Update setUser={setUser} />:""}
    {item?<User_Item setUser={setUser}/>:""}

    
    {value.user_Id==value.token._id&&addItem?<AddItem setUser={setUser}/>:""}
    
    </div>
    </div>
)

}


export default User;

