import React, { Component } from 'react';
import axios from 'axios/index';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            resMessage: null
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.login();
    };

    async login(){
        const response = await axios.post('http://localhost:5000/login',{
         email: this.state.email,
         password: this.state.password
        },{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setState({resMessage: response.data})
    };


    render() {
        return (
          <div>
              <h3>{this.state.resMessage}</h3>
            <form onSubmit={this.onSubmit}>
                <h1>Login Below!</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                />
                <input type="submit" value="Submit"/>
            </form>
          </div>
        );
    }
}