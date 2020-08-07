import React from "react";
import contactPagePicture from "../../../static/assets/images/auth/login.jpg"

export default function() {
  return (
    <div className="content-page-wrapper">
      <div 
      className="left-column"
      style={{
        background: "url(" + contactPagePicture + ") no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      </div>
      <div className="right-column">
        <div className="contact-info-container">
          <div className="contact-info-wrapper">
            <div className="carrot">-</div>
            <div>(503)-555-1337</div>
          </div>

          <div className="contact-info-wrapper">
            <div className="carrot">-</div>
            <div>We're on easy street,
            and feels so neat</div>
          </div>
          
        </div>
      </div>
    </div>
  )
}