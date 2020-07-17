import React from "react";
import axios from "axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            }, { withCredentials: true }
        )
        .then(res => {
            if (res.data.status === "created") {
                console.log("come on in")
            } else {
                this.setState({
                    errorText: "Wrong email or password"
                })
            }
        }).catch(error => {
            this.setState({
                errorText: "An error occurred"
            })
        });

        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    render() {
        return (
            <div>
                <h1>LOGIN TO ACCES YOUR DASHBOARD</h1>

                <div>{this.state.errorText}</div>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <input type="password" 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button>Login</button>
                </form>
            </div>
        )
    }
}