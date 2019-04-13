//Main index file. Determines whether use component. TOP-LEVEL routes only with encapsulated stores.

//import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//import main components
import DashBoard from './dashboard/app';
import Auth from './auth/app';
import AdminPanel from './admin-panel/app';
import ProjectManager from './project-manager/app';
import NotFound from './not-found/app';

import Test from './test/app';

//import middlewares
import withAuth from './withAuth';


//import reducers to create proiders
import reducers from  './test/reducers';



//TODO Add generic routes to sub-apps
//TODO Test multiple providers
//TODO encapsulate sub-apps
//TODO Transfer register to admin-panel instead of auth root
const MainTemplateWithRouter = (
<div>
   <Router>
           <h1>Header with Logo: XXXX</h1>
                <div>
                    <Link to="/">Home</Link>
                        <br/><br/>
                </div>


           <Provider store={createStore(reducers)}>
              <Switch>
                    <Route exact path="/" component={DashBoard} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/admin-panel" component={AdminPanel} />
                    <Route path="/project-manager" component={ProjectManager} />
                    <Route path="/test" component={Test} />
                    <Route path="*"  component={NotFound} />
              </Switch>
        </ Provider>
   </Router>
</div>
);

//TODO Add common components
ReactDOM.render(MainTemplateWithRouter, document.querySelector('#root'));