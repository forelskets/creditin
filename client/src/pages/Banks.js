/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/



import { useRef ,useState , useEffect} from "react";
import { useHistory } from "react-router-dom";



const Banks=() =>{
  const history = useHistory();
  const [data1,setData1] = useState([]); 
  const [bankDetails , setBankDetails] = useState({
    bankId:"",
    bankName:"",
    bankShortName:""
  })
  const refMondal = useRef(null);
  const addBank=()=>{
    refMondal.current.click();
  }

  const addDetails=(e)=>{
    const {name , value} = e.target;
    setBankDetails({...bankDetails , [name]: value})
  }

  const addVlaues= async(e)=>{
    e.preventDefault();

    const res = await fetch("/addBank",{
      method:"Post",
      headers:{
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify(bankDetails)
 });
  setBankDetails({
    bankId:"",
    bankName:"",
    bankShortName:""
  });
 const data = res.json()
 if(data && res.status === 201){
   window.alert("Bank add successfully")
 }
 else{
   window.alert("please fill details carefully");
 }
  }

  const fetchFunction=(async(req , res)=>{
    const response = await fetch('/addBank',{
      method:'GET',
      headers:{
        Accept: "application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    })

     const data = await response.json();
     
     if(response.status === 200){
     setData1(data);
     }else {
      history.push('/sign-in')
    }

  })

  useEffect(()=>{
    // eslint-disable-next-line
   fetchFunction();
  },[])
  return (
    <>
      <div className="tabled">
      <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">BankName</th>
      <th scope="col">BankShortName</th>
      <th scope="col">Status</th>
      <th scope="col" onClick={addBank}><i className="fas fa-plus-square"></i></th>

    </tr>
  </thead>
  <tbody>
    {data1.map((element) => {
        return (<tr>
      <th scope="row">{element.Id}</th>
      <td>{element.BankName}</td>
      <td>{element.BankShortName}</td>
      <td>@mdo</td>
    </tr>)
      })
    }
    
    
  </tbody>
</table>

<button type="button" className="btn btn-primary d-none" ref = {refMondal} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    
    <input type="number" className="form-control" id="bankId" name="bankId" value={bankDetails.bankId} onChange={addDetails} aria-describedby="emailHelp" placeholder="Enter Bank Id"/>
    
  </div>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="bankName" name="bankName" value={bankDetails.bankName} onChange={addDetails} placeholder="Enter Bank Name" />
  </div>
  <div className="mb-3">
   
   <input type="text" className="form-control" id="bankShortName" name="bankShortName" value={bankDetails.bankShortName} onChange={addDetails} placeholder="Enter Bank Short Name" />
 </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary " data-bs-dismiss="modal" onClick={addVlaues}>Submit</button>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
      </div>
    </>
  );
}

export default Banks;
