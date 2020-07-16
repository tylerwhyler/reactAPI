import React from "react";

import Login from "../auth/login"
import loginImg from "../../../static/assets/images/auth/login.jpg"

export default class Auth extends React.Component {
    render() {
        return (
            <div className="auth-page-wrapper">
                <div 
                    className="left-column" 
                    style={{
                        backgroundImage: `url(${loginImg})`
                    }}
                />
                <div className="right-column">
                    <Login />
                </div>
            </div>
        )
    }
}