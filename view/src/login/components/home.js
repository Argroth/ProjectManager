import React, { Component } from 'react';
import axios from 'axios';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount(){
           const response = axios.get('http://localhost:5000/api/secret');
            console.log(response);
           this.setState({message: response});
    }

    render() {
        return (
            <div>
                {this.state.message}
            </div>
        );
    }
}