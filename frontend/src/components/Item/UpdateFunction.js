import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Paragraph from '../Paragraph/Paragraph'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Img from "./Img"
import Select from "../Select/Select"



const UpdateFunction = ({_iduser,setReItem,setupdate}) => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [err, setErr] = useState('')

  const [title, settitle] = useState(undefined)
  const [price, setprice] = useState(undefined)
  const [description, setdescription] = useState(undefined)
  const [city,setcity]=useState(undefined)
const [country,setcountry]=useState(undefined)
  const [setUpdateItem, setsetUpdateItem] = useState('')
const [image,setimage]=useState(undefined)




const item_input_title =(e)=>{
    settitle(e.target.value)
}

const item_input_price =(e)=>{
    setprice(e.target.value)
}
const item_input_description =(e)=>{
    setdescription(e.target.value)
}

const item_input_country =(e)=>{
  setcountry(e.target.value)

}
const item_input_city =(e)=>{
setcity(e.target.value)

}

  const itemFunction = () => {
    return (
      <div>
      <div className="AddItem">
        <Form.Group style={{width: "90%"}} onChange={item_input_title} className="mb-3">
          <Form.Label >Title</Form.Label>
          <Form.Control  placeholder="Title" />
        </Form.Group>
        <Form.Group style={{width: "90%"}} onChange={item_input_description} className="mb-3">
          <Form.Label >Description</Form.Label>
          <Form.Control  placeholder="Description" />
        </Form.Group>
        <Form.Group style={{width: "90%"}} onChange={item_input_price} className="mb-3">
          <Form.Label >price</Form.Label>
          <Form.Control  placeholder="price" />
        </Form.Group>
      <Form.Group style={{width: "90%"}} value={city} onChange={item_input_city} className="mb-3" controlId="formBasicEmail">
        <Form.Label>city</Form.Label>
        <Form.Control type="text" placeholder="city" />
      </Form.Group>
        <label>country :</label>
      <br></br>
<Select value={country} fun={item_input_country} className="form-control" text="Country" />
<br></br>
        <br></br>
<label>image :</label>
<Img image={image} setimage={setimage}/>
<br></br>
        <Button className="additem-button" onClick={update_item} type="submit">Submit</Button>
      </div>
      </div>
    )
  }
    
const update_item = (e) => {
    setsetUpdateItem({title,
  description,
  price,
  img:image,
  city,
        country})
    
  if(_iduser===value.token._id){
    axios
      .put(`${process.env.REACT_APP_BACKEND}/items/${value.item_Id}`,{title,
      description,
      price,
      img:image,
      city,
        country},{
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        setReItem(a=>!a)
        setupdate(false)
        settitle(undefined)
setprice(undefined)
setdescription(undefined)
setcity(undefined)
setcountry(undefined)
setimage(undefined)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  }


  return (<>
      {itemFunction()}
      </>
  )
}

export default UpdateFunction
