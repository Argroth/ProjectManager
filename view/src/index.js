import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import DashBoard from './dashboard/app';
import AppLogin from './login/app';
import Home from "./login/components/home";
import Secret from './login/components/secret';
import Login from './login/components/login';
import withAuth from './withAuth';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={DashBoard} />
            <Route path="/applogin" component={AppLogin} />
            <Route path="/home" component={Home} />
            <Route path="/secret" component={withAuth({Secret})} />
            <Route path="/login" component={Login} />

        </div>
    </Router>
);

ReactDOM.render(routing, document.querySelector('#root'));