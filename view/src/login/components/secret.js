import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
const data = {};

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
//TODO get cookie is working well
    async getMessage(){
        const response = await axios.post('http://localhost:5000/cookie', data,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
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