

import { WindowsFilled } from '@ant-design/icons';
import React,{ useState} from 'react';


const ModalComponent = (props) => {
     
    const [userDetails , setUserDetails] = useState({
        userName:"",
        userEmail:"",
        userPassword:"",
        userCPassword:"",
        userMobile:"",
       
      })

      const changeHandler=(e)=>{
        const {name , value} = e.target;
        setUserDetails({
          ...userDetails,
             [name]: value
        })
      }
    
    

const changeFormsValue = async ()=>{
    
    const Name = userDetails.userName;
    const Email = userDetails.userEmail;
    const Password = userDetails.userPassword;
    const CPassword = userDetails.userCPassword;
    const Mobile  = userDetails.userMobile; 
    if(!Name || !Email || !Password || !CPassword || !Mobile){
      window.alert("Please fill complete data")
    }else if(Password !== CPassword)
      {
        window.alert("Password and Confirm Password is not matched")
      }
      else{
    const response  = await fetch("/userRegister",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({Name, Email, Password, Mobile})

    })
      setUserDetails({
        userName:"",
        userEmail:"",
        userPassword:"",
        userCPassword:"",
        userMobile:"",
      })
      const data = await response.json();
      
      if(response.status === 400 && data){
        window.alert(data)
      }
      else if(response.status === 200 && data){
        props.formsValue(false)
      }

     

        }
}


        
    
  

  return (
  <>
    <form>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="userName" name="userName"  aria-describedby="emailHelp" placeholder="Enter Your Name"
    value={userDetails.userName}
    onChange={changeHandler} />
    
  </div>
  <div className="mb-3">
   
    <input type="email" className="form-control" id="userEmail" name="userEmail"  placeholder="Enter Your Email" 
     value={userDetails.userEmail}
     onChange={changeHandler}/>
  </div>
  <div className="mb-3">
   
   <input type="password" className="form-control" id="userPassword" name="userPassword"  placeholder="Enter Your Password" 
    value={userDetails.userPassword}
    onChange={changeHandler}/>
 </div>
 <div className="mb-3">
   
   <input type="password" className="form-control" id="userCPassword" name="userCPassword"  placeholder="Enter Your confirm - password" 
    value={userDetails.userCPassword}
    onChange={changeHandler}/>
 </div>
  <div className="mb-3">
   
   <input type="text" className="form-control" id="userMobile" name="userMobile"  placeholder="Enter Your Mobile No." 
    value={userDetails.userMobile}
    onChange={changeHandler}/>
   
 </div>
  
  <button type="button" className="btn btn-primary "  onClick={changeFormsValue}>Submit</button>
</form>
  </>
  )
};

export default ModalComponent;
