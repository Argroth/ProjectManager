//This is main index file.
//Define there only top-level routes
//All specific routes should be included in component-level routers as a children with encapsulated stores


//import dependencies
import React, {Component} from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

//import main components
import DashBoard from './dashboard/app';
import Auth from './auth/app';
import AdminPanel from './admin-panel/app';
import ProjectManager from './project-manager/app';
import NotFound from './not-found/app';
import Test from './test/app';

//import layout components
import Navbar from './layouts/navbar';
import Sidebar from './layouts/sidebar';
import Wrapper from './layouts/wrapper';
import Main from './layouts/main';
import Footer from './layouts/footer';

//import combined reducers
import CombineReducers from './reducers';

//import middlewares
import withAuth from './middlewares/withAuth';

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(CombineReducers, applyMiddleware(thunk));

    }
    render() {
        return (
            <div>
                <Provider store={this.store} >
                    <Router>
                        <Wrapper>
                            <Sidebar />
                            <Main>
                                <Navbar />
                                    <Switch>
                                        <Route exact path="/" component={withAuth(DashBoard)} />
                                        <Route path="/auth" component={Auth} />
                                        <Route path="/admin-panel" component={AdminPanel} />
                                        <Route path="/project-manager" component={ProjectManager}/>
                                        <Route path="/test" component={Test} />
                                        <Route path="*"  component={NotFound} />
                                    </Switch>
                                <Footer />
                            </Main>
                        </Wrapper>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default AppRouter;