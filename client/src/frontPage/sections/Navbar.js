import React,{useState , useEffect , useRef } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import ModalComponent from './modalComponent';
import OtpComponent from './otpComponent';


const Navbar = () => {

  const history = useHistory();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [forms , setForms] = useState(false)
 
  const refModal = useRef(null);
  const loginModal = useRef(null);
  const register=()=>{
         refModal.current.click();
         setForms(true)
     }
  const loginVar=()=>{
    loginModal.current.click();
   
  }
 const formsValue=(a)=>{
     setForms(a);
 }

 const loginSubmit= async (req , res)=>{
   const response = await fetch('/userLogin',{
     method:"POST",
     headers:{
       "Content-Type" : "application/json"
     },
     body:JSON.stringify({email , password})
   })

   const data = await response.json();

   console.log(data);
   if(response.status === 400 && data){
    window.alert(data);
   }
   else if(response.status === 200 && data)
   {
     
     if(data.RoleId === 1){
      // dispatch({type:"USER", payload:false})
       history.push('/nav')
     }
     else if(data.RoleId === 2){
      // dispatch({type:"USER", payload:true})
      history.push('/nav')
     }
   }
 }
  

  return (
  <>
       <nav className="navbar navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="#">
          <img
            src="images/credit-n-logo.svg"
            
            className="d-inline-block align-top"
            alt=""
          />
          
        </NavLink>

        <button
          className="navbar-toggler me-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i
            className="fab fa-ioxhost fa-2x outline-none"
            style={{color: "#155263", outline: "none"}}
          ></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <button className="btn-1 button my-1" onClick={()=>{window.location.href="http://localhost:3001/cdashboard"}}>get the app</button>
            </li>
            <li className="nav-item active">
              <button className="btn-2 button my-1" onClick={register}>register</button>
            </li>
            <li className="nav-item active">
              <button className="btn-2 button my-1" onClick={loginVar}>login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <button type="button" className="btn btn-primary d-none" ref = {refModal} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Registered here</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        
        {(forms) ? <ModalComponent formsValue = {formsValue} /> : <OtpComponent  />
         }
     
     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>

<button type="button" className="btn btn-primary d-none" ref = {loginModal} data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Login here</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

        
      <form>
      <div className="mb-3">
          <input type="email" className="form-control" id="email" name="email" value={email}  placeholder="Enter YOur Email" 
          onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div className="mb-3">
          <input type="password" className="form-control" id="password" name="password" value={password}  placeholder="Enter Password" 
          onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div className="mb-3">
           <button type="button" className="btn btn-primary " data-bs-dismiss="modal" onClick={loginSubmit}>Submit</button>
          </div>
      </form>
     
     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  
  </>
  )
};

export default Navbar;
