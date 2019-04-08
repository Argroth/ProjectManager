import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import DashBoard from './dashboard/app';
import AppLogin from './login/app';
import Home from "./login/components/home";
import Secret from './login/components/secret';
import Login from './login/components/login';
import Register from './login/components/register';
import CreatePassword from './login/components/create-password';
import withAuth from './withAuth';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={DashBoard} />
            <Route path="/applogin" component={AppLogin} />
            <Route path="/home" component={Home} />
            <Route path="/secret" component={Secret} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/createpassword/:token" component={CreatePassword} />

        </div>
    </Router>
);

ReactDOM.render(routing, document.querySelector('#root'));