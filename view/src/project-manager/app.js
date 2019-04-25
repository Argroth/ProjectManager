//import dependencies
import React, {Component} from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import { Route, Switch } from "react-router-dom";


//import components
import Dummy from "../common-components/dummy-component";
import NotFound from "../not-found/app";
import SubNavBar from "./components/navbar";
import CreateProject from './components/project-create';
import ListProjects from './components/project-list';
import ContributedProjects from './components/project-contributed';


//import combined reducers
import reducers from './reducers';


class App extends Component {
    constructor(props) {
        super(props);
        //create isolated store with thunk middleware
        this.store = createStore(reducers, applyMiddleware(thunk)
            );
    };

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <SubNavBar />

                    <Switch>
                        <Route exact path="/project-manager/" component={Dummy} />
                        <Route exact path="/project-manager/create-project" component={CreateProject} />
                        <Route exact path="/project-manager/project-list" component={ListProjects} />
                        <Route exact path="/project-manager/contributed-projects" component={ContributedProjects} />
                        <Route path="*"  component={NotFound} />
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;