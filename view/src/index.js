// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './login/app';
//
// ReactDOM.render(<App />, document.querySelector('#root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import DashBoard from './dashboard/app';
import Login from './login/app';
import Home from "./login/components/home";


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={DashBoard} />
            <Route path="/login" component={Login} />
            <Route path="/home" exact component={Home} />

        </div>
    </Router>
);

ReactDOM.render(routing, document.querySelector('#root'));