import React, {Component} from 'react';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Apps from '../admin-panel/components/user-edit';
const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div>


                <Provider store={store}>
                    <Apps />
                </Provider>
            </div>
        );
    }
}

export default App;