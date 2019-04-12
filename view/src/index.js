import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import DashBoard from './dashboard/app';
import AppLogin from './login/app';
import Home from "./login/components/home";
import Login from './login/components/login';
import Register from './login/components/register';
import CreatePassword from './login/components/create-password';
import ResetPassword from './login/components/reset-password';
import NewPassword from './login/components/change-password';
import AdminPanel from './panel/app';
import NotFound from './not-found/app';
import withAuth from './withAuth';


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Test from './test/index';
import reducers from  './test/reducers';
//<Route path="/test" component={withAuth(Test)} />

//TODO Add generic routes to sub-apps
//TODO Test multiple providers
//TODO encapsulate sub-apps
//TODO Transfer register to admin panel instead of auth root
const routing = (

    <Router>
        <div>
            <p>Generic Component</p>


            <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route path="/applogin" component={AppLogin} />
                <Provider store={createStore(reducers)}>
                <Route path="/test" component={Test} />
                </Provider>


            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/createpassword/:token" component={CreatePassword} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/newpass/:token" component={NewPassword} />
            <Route path="/panel" component={AdminPanel} />
            <Route path="*"  component={NotFound} />
            </Switch>
        </div>
    </Router>
);

//TODO Add common components
ReactDOM.render(routing, document.querySelector('#root'));