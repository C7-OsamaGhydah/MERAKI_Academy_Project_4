import React from "react";
import { useEffect,useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../App";
import Paragraph from "../Paragraph/Paragraph"
import "./Footer.css";
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";





const Footer=()=>{

const value = useContext(AllContext);
const navigate = useNavigate();


return(
  <div className="Fotter">
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title"><span style={{color:" #fedc47",fontSize:"larger"}}>X</span>changeez</h5>
            <p>
            The largest site in the Middle East for the exchange of items.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Contact Us</h5>
            <ul>
              <li className="list-unstyled">
              <FaGithub/> 
                <a href="https://github.com/OsamaGhydah">GitHub</a>
              </li>
              <li className="list-unstyled">
              <FaFacebookSquare/>
                <a href="https://github.com/OsamaGhydah">Facebook</a>
              </li>
              <li className="list-unstyled">
              <FaLinkedin/>
                <a href="https://www.linkedin.com/in/osama-alajoury-3382671ba/">Linkedin</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/OsamaGhydah">Osama Ghydah</a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
)

}


export default Footer;

