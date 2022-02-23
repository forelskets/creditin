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



import React from "react";
import {NavLink} from 'react-router-dom'



const BankOffers=() =>{

  return (
    <>
     <div className="layout-content">
     <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <NavLink to="#" className="card-link">Card link</NavLink>
    <NavLink to="#" className="card-link">Another link</NavLink>
  </div>
</div>





      </div>
    </>
  );
}

export default BankOffers;
