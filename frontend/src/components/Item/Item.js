import './Item.css'
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AllContext } from '../../App'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Comments from './Comments'
import UpdateFunction from './UpdateFunction'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

const Item = () => {
  const value = useContext(AllContext)
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [reitem, setReItem] = useState(false)
  const [deleteItem, setDeleteItem] = useState(false)
  const [showuserinformation, setshowuserinformation] = useState(false)
  const [coment, setcoment] = useState(false)
  const [update, setupdate] = useState(false)

  const [_iduser, set_iduser] = useState("")
  
  
  
  
  
  //this useEffect to get item 
  useEffect(() => {
    if (value.item_Id) {
      axios
        .get(`http://localhost:5000/items/${value.item_Id}`, {
          headers: { Authorization: `Bearer  ${value.token.token}` },
        })
        .then((result) => {
          console.log(result.data.result.user._id)
          set_iduser(result.data.result.user._id)
          setItem(result.data.result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }else if (!value.item_Id){
      navigate("/")
    }
  }, [reitem])


  //this useEffect to delet item 

const delete_item = (e) => {
  setDeleteItem(!deleteItem)
  if(_iduser===value.token._id){
    axios
      .delete(`http://localhost:5000/items/${value.item_Id}`, {
        headers: { Authorization: `Bearer  ${value.token.token}` },
      })
      .then((result) => {
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
}

const userinformation =(e)=>{
  setshowuserinformation(!showuserinformation)
}


const commentsItem =(e)=>{
  setcoment(!coment)
  setupdate(false)
}


const itemfun =(e)=>{
  setcoment(false)
setupdate(false)
}


const updateItem =(e)=>{
  setcoment(false)
setupdate(!update)
}

  const itemFunction = () => {
    return (
        <Card className='item-cared' key={item._id}>
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link onClick={itemfun}>Item</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={commentsItem} >
              Offer
            </Nav.Link>
          </Nav.Item>
          {_iduser===value.token._id?<><Nav.Item>
            <Nav.Link onClick={updateItem}>Update Item</Nav.Link>
          </Nav.Item><Nav.Item>
            <Nav.Link onClick={delete_item}>Delete Item</Nav.Link>
          </Nav.Item></>:""}
          
        </Nav>
      </Card.Header>
        
        {coment?<Comments reitem={reitem} setReItem={setReItem} item={item} setIte={setItem}/>:update?<UpdateFunction/>:
        <>
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text> 
          {item.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>price : {item.price}</ListGroup.Item>
          <ListGroup.Item>location : {item.location}</ListGroup.Item>
          <ListGroup.Item>type :{item.type.type}</ListGroup.Item>
        </ListGroup>
        <br></br>
        <Button variant="dark" className='item-button' onClick={userinformation} >show user information</Button>

        {showuserinformation?<><Card.Body>
          <Card.Title>Name : {item.user.firstName}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>_id :{item.user._id}</ListGroup.Item>
          <ListGroup.Item>phone Number : {item.user.phoneNumber}</ListGroup.Item>
          <ListGroup.Item><p>city : {item.user.city}</p></ListGroup.Item>
          <ListGroup.Item><p>country : {item.user.country}</p></ListGroup.Item>
        </ListGroup>
        </>:""}</>}
        <br></br>
          <Card.Link className="itme-p" id={item.user._id} onClick={"userfun"}>User profile</Card.Link>
    </Card>
    )
  }



  return (
    <div className="Item">
      {item ? itemFunction() : <></>}
    </div>
  )
}

export default Item
