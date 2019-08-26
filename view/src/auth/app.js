//import dependencies
import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';

//import components
import Dummy from '../common-components/dummy-component';
import Login from './components/login';
import CreatePassword from './components/password-create';
import ResetPassword from './components/password-reset';
import NotFound from '../not-found/app';


class App extends Component {
    render() {
        return (
            <div>


                    <li><Link to="/auth/login">Login</Link></li>
                    <li><Link to="/auth/reset-password">Reset Password</Link></li>
                    <li><Link to="/auth/create-password">Create password (mock to backend)</Link></li>



                   <Switch>
                       <Route exact path="/auth/" component={Dummy} />
                       <Route exact path="/auth/login" component={Login} />
                       <Route exact path="/auth/create-password/:token" component={CreatePassword} />
                       <Route exact path="/auth/reset-password" component={ResetPassword} />
                       <Route exact path="*"  component={NotFound} />
                   </Switch>
                </div>
        );
    }
}

export default App;