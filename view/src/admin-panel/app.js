import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Dummy from "../common-components/dummy-component";
import NotFound from "../not-found/app";

import UserModule from './components/user';
import CreateNewUser from './components/user-register';
import UserList from './components/user-list';
import EditUser from './components/user-edit';

import ProjectManager from './components/project-manager';
import ProjectManagerList from './components/project-manager-list';

import {createStore, applyMiddleware} from "redux";
import AdminPanelReducer from './reducers';
import SubNavBar from './components/navbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(AdminPanelReducer, applyMiddleware(thunk));
    }

    render() {
        return (
            <Provider store={this.store}>
            <div>
                <SubNavBar />

                <Switch>
                    <Route exact path="/admin-panel/" component={Dummy} />
                    <Route exact path="/admin-panel/user-module" component={UserModule} />
                    <Route exact path="/admin-panel/user-module/create-user" component={CreateNewUser} />
                    <Route exact path="/admin-panel/user-module/user-list" component={UserList} />
                    <Route exact path="/admin-panel/user-module/edit-user" component={EditUser} />
                    <Route exact path="/admin-panel/project-manager" component={ProjectManager} />
                    <Route exact path="/admin-panel/project-manager/project-list" component={ProjectManagerList} />
                    <Route path="*"  component={NotFound} />
                </Switch>
            </div>
            </Provider>
        );
    }
}

export default App;