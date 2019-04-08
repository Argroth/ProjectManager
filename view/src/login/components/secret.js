import React, { Component } from 'react';
import axios from 'axios';
const data = {};
//axios.defaults.withCredentials = true;

export default class Secret extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount(){
        this.getMessage();
    };

    async getMessage(){
        const response = await axios.get('http://localhost:5000/checktoken',{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        this.setState({message: response.data});


    }


    render() {
        return (
            <div>
                <h1>Secret</h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}