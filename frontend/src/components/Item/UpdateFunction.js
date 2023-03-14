import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Paragraph from '../Paragraph/Paragraph'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateFunction = ({_iduser,setReItem,setupdate}) => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [err, setErr] = useState('')

  const [title, settitle] = useState(undefined)
  const [price, setprice] = useState(undefined)
  const [description, setdescription] = useState(undefined)
  const [location, setlocation] = useState(undefined)
  const [img, setimg] = useState(undefined)
  const [setUpdateItem, setsetUpdateItem] = useState('')



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

  const itemFunction = () => {
    return (
      <div>
        <Form.Group onChange={item_input_title} className="mb-3">
          <Form.Label >Title</Form.Label>
          <Form.Control  placeholder="Title" />
        </Form.Group>
        <Form.Group onChange={item_input_description} className="mb-3">
          <Form.Label >Description</Form.Label>
          <Form.Control  placeholder="Description" />
        </Form.Group>
        <Form.Group onChange={item_input_price} className="mb-3">
          <Form.Label >price</Form.Label>
          <Form.Control  placeholder="price" />
        </Form.Group>
        <Form.Group onChange={item_input_img} className="mb-3">
          <Form.Label >img</Form.Label>
          <Form.Control  placeholder="img" />
        </Form.Group>
        <Form.Group onChange={item_input_location} className="mb-3">
          <Form.Label >location</Form.Label>
          <Form.Control  placeholder="location" />
        </Form.Group>

        <Button onClick={update_item} type="submit">Submit</Button>
      
      </div>
    )
  }
    
const update_item = (e) => {
    setsetUpdateItem({title,
  description,
  price,
  img,
  location})
    
  if(_iduser===value.token._id){
    axios
      .put(`http://localhost:5000/items/${value.item_Id}`,{title,
      description,
      price,
      img,
      location},{
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        console.log(result.data)
        setReItem(a=>!a)
        setupdate(false)
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
