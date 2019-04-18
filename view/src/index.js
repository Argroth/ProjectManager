//This is main index file.
//Define there only top-level routes
//All specific routes should be included in component-level routers as a children with encapsulated stores


//import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';



//import main components
import DashBoard from './dashboard/app';
import Auth from './auth/app';
import AdminPanel from './admin-panel/app';
import ProjectManager from './project-manager/app';
import NotFound from './not-found/app';
import Navbar from './common-components/navbar';
import Test from './test/app';

//import middlewares
import withAuth from './withAuth';


const MainTemplateWithRouter = (
<div>
  <Router>

    <div>
        <h1>Telemond App</h1>
    </div>
    <Navbar />


       <Switch>
           <Route exact path="/" component={DashBoard} />
           <Route path="/auth" component={Auth} />
           <Route path="/admin-panel" component={AdminPanel} />
           <Route path="/project-manager" component={ProjectManager} />
           <Route path="/test" component={Test} />
           <Route path="*"  component={NotFound} />
       </Switch>
   </Router>
</div>
);

ReactDOM.render(MainTemplateWithRouter, document.querySelector('#root'));