//import dependencies
import React, {Component} from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import { Route, Switch } from "react-router-dom";


//import components
import Dummy from "../common-components/dummy-component";
import NotFound from "../not-found/app";
import CreateProject from './components/project-create';
import ListProjects from './components/project-list';
import ContributedProjects from './components/project-contributed';
import ProjectView from './components/project-view';
import ProjectEdit from './components/project-edit';
import ProjectPreparation from './components/project-preparation';
import ProjectImplementation from './components/project-implementation';
import ProjectFinished from './components/project-finished';


//import combined reducers
import reducers from './reducers';


class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(reducers, applyMiddleware(thunk)
            );
    };

    render() {
        return (
            <Provider store={this.store}>
                    <Switch>
                        <Route exact path="/project-manager/" component={Dummy} />
                        <Route exact path="/project-manager/create-project" component={CreateProject} />
                        <Route exact path="/project-manager/project-list" component={ListProjects} />
                        <Route exact path="/project-manager/project-list/implementation" component={ProjectImplementation} />
                        <Route exact path="/project-manager/project-list/preparation" component={ProjectPreparation} />
                        <Route exact path="/project-manager/project-list/finished" component={ProjectFinished} />
                        <Route exact path="/project-manager/project/:projectID" component={ProjectView} />
                        <Route exact path="/project-manager/project-edit/:projectID" component={ProjectEdit} />
                        <Route exact path="/project-manager/contributed-projects" component={ContributedProjects} />
                        <Route path="*"  component={NotFound} />
                    </Switch>
            </Provider>
        );
    }
}

export default App;