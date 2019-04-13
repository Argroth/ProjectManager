import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from '../auth/components/login';
import Dummy from '../common-components/dummy-component';
import TestComp from './components/app';
import NotFound from "../not-found/app";
import SongsComponent from './components/app';

export default class App extends Component {
    render() {
        return (
            <div>
                <p>Test component</p>
                <SongsComponent />

                    <Switch>
                        <Route exact path="/test/" component={Dummy} />
                        <Route exact path="/test/22" component={TestComp} />
                        <Route exact path="/test/login" component={Login} />
                        <Route path="*"  component={NotFound} />
                    </Switch>

            </div>
        );
    }
}