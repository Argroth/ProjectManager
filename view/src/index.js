import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './project-manager/reducers';
import TasksIndex from './project-manager/components/tasks-index';
import TasksNew from './project-manager/components/tasks-new';
import TasksShow from './project-manager/components/tasks-show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/tasks/show/:id" component={TasksShow}/>
                    <Route path="/tasks/new" component={TasksNew}/>
                    <Route path="/" component={TasksIndex}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));
