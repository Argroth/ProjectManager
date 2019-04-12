import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from '../login/app';
import TestComp from './components/app';
import NotFound from "../not-found/app";

export default class App extends Component {
    render() {
        return (
            <div>
                <p>Test component</p>
                    <Switch>
                        <Route exact path="/test/22" component={TestComp} />
                        <Route exact path="/test/login" component={Login} />
                        <Route path="*"  component={NotFound} />
                    </Switch>

            </div>
        );
    }
}