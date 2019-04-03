import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/home">Home</Link></li>

                </ul>
            </div>
        );
    }
}