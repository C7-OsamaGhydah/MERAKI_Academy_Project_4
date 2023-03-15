import "./User.css";
import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";








const AddItem=({setUser})=>{

const value = useContext(AllContext);
const navigate = useNavigate();

const [types,setTypes]=useState([])



const [title,settitle]=useState(undefined)
const [description,setdescription]=useState(undefined)
const [price,setprice]=useState(undefined)
const [img,setimg]=useState(undefined)
const [location,setlocation]=useState(undefined)
const [type,settype]=useState(undefined)
    

useEffect(()=>{
    if(types.length===0){
        axios.get("http://localhost:5000/types",{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
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
const item_input_img =(e)=>{
setimg(e.target.value)
}
const item_input_location =(e)=>{
    setlocation(e.target.value)
}
const item_input_description =(e)=>{
    setdescription(e.target.value)
}

const item_Button =()=>{

        axios.post("http://localhost:5000/items",{title,
        description,
        price,
        img,
        location,
        user:value.token._id,
        type},{headers:{"Authorization":`Bearer  ${value.token.token}`}}).then((result)=>{
        console.log(result.data.result)
settitle("")
setdescription("")
setprice("")
setimg("")
setlocation("")
settype("")
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
      <Form.Group style={{width: "90%"}} value={location} onChange={item_input_location} className="mb-3" controlId="formBasicEmail">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="location" />
      </Form.Group>
      <Form.Group style={{width: "90%"}} value={img} onChange={item_input_img} className="mb-3" controlId="formBasicEmail">
        <Form.Label>image</Form.Label>
        <Form.Control type="text" placeholder="image" />
      </Form.Group>
      <label>type</label>
<select placeholder="type" className="additem-selsct" onChange={type_input} >
    {typesFunction()}
</select>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button onClick={item_Button} className="additem-button" variant="primary" type="submit">
        Submit
      </Button>
      </>
    </div>
)

}

export default AddItem;

