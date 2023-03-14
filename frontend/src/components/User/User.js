import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import axios from "axios";
import User_Update from "./User_Update"
import User_Item from "./User_Item"
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';







const User=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [err,setErr]=useState("")
const [user, setUser] = useState([])
const [update, setupdate] = useState([])
const [item, setitem] = useState([])



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
      <div key={user._id} className="user-pop-top">
        {user.img?
          <Image className="img-pop" src={user.img} alt="Girl in a jacket"/>
        :""}
        <div className="info-pop">
            <p>Name :{user.firstName}</p>
            <p>id :{user._id}</p>
            <p>phone Number : {user.phoneNumber}</p>
            <p>city : {user.city}</p>
            <p>country : {user.country}</p>
            </div>
        </div>)
    }else{
        return <p>looding</p>
    }
    
        }

        
const showUpdate =(e)=>{
setupdate(!update)
setitem(false)
}

const showItem =(e)=>{
setupdate(false)
setitem(!item)
}

return(<div className="User">
    {user?userFunction() :<p>{err}</p>}
    <hr></hr>
    <div style={{alignSelf:"center"}}>
    {value.user_Id==value.token._id?<><Button variant="dark" className='item-button' onClick={showUpdate} >Update</Button><Button variant="dark" className='item-button' onClick={showUpdate} >Add Item</Button></>:""}
    <Button variant="dark" className='item-button' onClick={showItem} >Item</Button>
    </div>
    <hr></hr>
    <div className="user-pop">
      {value.user_Id==value.token._id&&update?<User_Update/>:""}
    {item?<User_Item/>:""}
    </div>
    </div>
)

}


export default User;

