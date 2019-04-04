import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: ''
        };
    };

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.login();
    };
    async login(){
        const response = await axios.post('http://localhost:5000/api/authenticate',{
         email: this.state.email,
         password: this.state.password
        },{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login Below!</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}