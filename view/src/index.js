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
import NotFound from './not-found/app';


const routing = (
    <Router>
        <div>
            <Route exact path="/" component={DashBoard} />
            <Route path="/login" component={Login} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.querySelector('#root'));