import React, {Component} from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import SubNavBar from "./components/navbar";
import { Route, Switch } from "react-router-dom";

import reducers from './reducers';
import Dummy from "../common-components/dummy-component";
import NotFound from "../not-found/app";

class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(reducers, applyMiddleware(thunk));
    };

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <SubNavBar />

                    <Switch>
                        <Route exact path="/project-manager/" component={Dummy} />
                        <Route exact path="/project-manager/create-project" component={Dummy} />
                        <Route exact path="/project-manager/project-list" component={Dummy} />
                        <Route exact path="/project-manager/contributed-projects" component={Dummy} />
                        <Route path="*"  component={NotFound} />
                    </Switch>
                </div>
            </Provider>
        );
    }
}

export default App;