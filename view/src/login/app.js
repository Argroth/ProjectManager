import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/secret">Secret</Link></li>
                    <li><Link to="/login">Login</Link></li>

                </ul>
            </div>
        );
    }
}