//This is main index file.
//Define there only top-level routes
//All specific routes should be included in component-level routers as a children with encapsulated stores


//import dependencies
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';

//import main components
import DashBoard from './dashboard/app';
import Auth from './auth/app';
import AdminPanel from './admin-panel/app';
import ProjectManager from './project-manager/app';
import NotFound from './not-found/app';
import Test from './test/app';

import Navbar from './common-components/navbar';
import Sidebar from './common-components/sidebar';
import Wrapper from './common-components/wrapper';
import Main from './common-components/main';
import Footer from './common-components/footer';

//import middlewares
import withAuth from './middlewares/withAuth';

import { LanguageContext } from '../src/context';
const {Provider} = LanguageContext;


const MainTemplateWithRouter = (
<div>
 <Router>
    <Wrapper>
        <Sidebar />
        <Main>
            <Navbar />
            <Provider value='PL'>
                   <Switch>
                       <Route exact path="/" component={withAuth(DashBoard)} />
                       <Route path="/auth" component={Auth} />
                       <Route path="/admin-panel" component={AdminPanel} />
                       <Route path="/project-manager" component={ProjectManager}/>
                       <Route path="/test" component={Test} />
                       <Route path="*"  component={NotFound} />
                   </Switch>
            </Provider>
            <Footer />
        </Main>
    </Wrapper>
 </Router>
</div>
);



ReactDOM.render(MainTemplateWithRouter, document.querySelector('#root'));