// import { createRef,useState } from "react";
// import { Avatar,Button as MuiButton } from "@material-ui/core";
// import DeleteIcon from "@mui/icon-material/Delete"
// import UploadIcon from "@mui/icon-material/Upload"
// import {spacing} from "@material-ui/system"
// import styled from "styled-components"





// const AvatarUpload =({img,imageUpload})=>{
//     const [image,_setImage]=useState()
//     const inputFileRef = createRef()
//     const cleanup =()=>{
//         URL.revokeObjectURL(image && img);
//         inputFileRef.current.value =null;
//     }

//     const setImage =(newImage)=>{
//         if(image) {
//             cleanup();
//         }
//         _setImage(newImage)
//     }
// const handleOnChange =(event)=>{
//     const newImage =event.target.files[0]

//     if(newImage){
//         setImage(URL.createObjectURL(newImage));
//     }
//     imageUpload(event)
// }

// return (
//     <CenteredContent>
//         <BigAvatar>

//         </BigAvatar>
//     </CenteredContent>
// )
// }