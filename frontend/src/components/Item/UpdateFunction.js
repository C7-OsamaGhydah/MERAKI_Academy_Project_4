// import './Item.css'
// import React from 'react'
// import { useEffect, useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AllContext } from '../../App'
// import Paragraph from '../Paragraph/Paragraph'
// import Input from '../Input/Input'
// import Button from '../Button/Button'
// import axios from 'axios'

// const UpdateFunction = ({title,
//   description,
//       price,
//   img,
//   video,
//   location,
//       user,
//   typeupdateItem,setUpdateItem}) => {
//   const value = useContext(AllContext)
//   const navigate = useNavigate()

//   const [err, setErr] = useState('')

  



// const item_input_title =(e)=>{
//     title=e.target.value
// }

// const item_input_price =(e)=>{
//     price=e.target.value
// }
// const item_input_img =(e)=>{
//     img=e.target.value
// }
// const item_input_video =(e)=>{
//     video=e.target.value
// }
// const item_input_location =(e)=>{
//     location=e.target.value
// }
// const item_input_description =(e)=>{
//     description=e.target.value
// }

//   const itemFunction = () => {
//     return (
//       <div>
//         <Input fun={item_input_title} className="additem-input" text="Title" />
//         <Input
//           fun={item_input_description}
//           className="additem-input"
//           text="description"
//         />
//         <Input fun={item_input_price} className="additem-input" text="price" />
//         <Input fun={item_input_img} className="additem-input" text="img" />
//         <Input fun={item_input_video} className="additem-input" text="video" />
//         <Input
//           fun={item_input_location}
//           className="additem-input"
//           text="location"/>
//       </div>
//     )
//   }
//   const update_item = (e) => {
//     console.log({title,
//         description,
//         price,
//         img,
//         video,
//         location,
//         user})
//   }


//   return (<>
//       {itemFunction()}
//       </>
//   )
// }

// export default UpdateFunction
