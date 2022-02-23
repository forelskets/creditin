import React from 'react';

const section1 = () => {
  return (
  <>
   <section className="header w-100">
   <div className="container">
        <div className="row">
          <div className="col-md-7 col-12 text-area">
            <div className="heading">
              <span> Earn Money By<br />Selling </span>
              <span style={{color: "rgb(12, 11, 11)"}}>Credit Cards</span>
            </div>
            <div id="paragraph" className="pb-5 mt-5">
              <span className="paragraph" >
                Start Your Business with Zero Investment and Earn over ₹1,00,000
                Every <br />Month. Provide financial advice and products to the
                customers and get a <br />fast payout every month.
              </span>
            </div>

            <div className="button-area">
              <button className="button btn-4"><img src="images/get-on-playstore.png" alt="" className="img-fluid"/></button>
            </div>
          </div>
          <div className="col-md-5 col-12 img-area d-md-block d-none ">
            <img
              src="images/MOBILEPNG.png"
              alt=""
              className="img-container"
            />
          </div>
        </div>
      </div>
    </section>
  </>)
};

export default section1;
