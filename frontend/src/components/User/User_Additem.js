import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Img from "./Img"
import Select from "../Select/Select"








const AddItem=({setUser})=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [types,setTypes]=useState([])



const [title,settitle]=useState(undefined)
const [description,setdescription]=useState(undefined)
const [price,setprice]=useState(undefined)
const [city,setcity]=useState(undefined)
const [country,setcountry]=useState(undefined)
const [type,settype]=useState(undefined)
const [image,setimage]=useState(undefined)

    

useEffect(()=>{
    if(types.length===0){
        axios.get(`${process.env.REACT_APP_BACKEND}/types`,{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        setTypes(result.data.result)
    }).catch((err)=>{
        console.log(err.message)
    })
    }
    
},[types])


const typesFunction=()=>{
    return types.map((type)=>{
        return (
            <option className="additem-input" key={type._id} value={type._id}>{type.type}</option>
            )
    })
}

const type_input =(e)=>{
settype(e.target.value)
}
const item_input_title =(e)=>{
    settitle(e.target.value)
}

const item_input_price =(e)=>{
setprice(e.target.value)
}


const item_input_country =(e)=>{
    setcountry(e.target.value)
  
  }
  const item_input_city =(e)=>{
  setcity(e.target.value)
  
  }
const item_input_description =(e)=>{
    setdescription(e.target.value)
}

const item_Button =()=>{
    

        axios.post(`${process.env.REACT_APP_BACKEND}/items`,{title,
        description,
        price,
        img:image,
        city,
country,
        user:value.token._id,
        type},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
settitle(undefined)
setdescription(undefined)
setprice(undefined)
setimage(undefined)
setcity(undefined)
setcountry(undefined)
settype(undefined)
setUser([])
    }).catch((err)=>{
        console.log(err.message)
    })
}

return(<div style={{borderRadius: "7px",border:"1px solid black"}}>
<>
      <Form.Group style={{width: "90%"}} value={title} onChange={item_input_title} className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" />
      </Form.Group>
      <Form.Group style={{width: "90%"}} value={description} onChange={item_input_description} className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" />
      </Form.Group>
      <Form.Group style={{width: "90%"}} value={price} onChange={item_input_price} className="mb-3" controlId="formBasicEmail">
        <Form.Label>price</Form.Label>
        <Form.Control type="text" placeholder="price" />
      </Form.Group>
      <Form.Group style={{width: "90%"}} value={city} onChange={item_input_city} className="mb-3" controlId="formBasicEmail">
        <Form.Label>city</Form.Label>
        <Form.Control type="text" placeholder="city" />
      </Form.Group>
        <label>country :</label>
      <br></br>
<Select value={country} fun={item_input_country} className={"register-input"} text="Country" />
<br></br>
      <br></br>
      <label>type</label>
<select placeholder="type" className="additem-selsct" onChange={type_input} >
    {typesFunction()}
</select>
      
<br></br>
<label>image :</label>
<Img image={image} setimage={setimage}/>
      <Button onClick={item_Button} className="additem-button" variant="primary" type="submit">
        Submit
      </Button>
      </>
    </div>
)

}

export default AddItem;

