import React, {Component} from 'react';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Appka from './components/app';

// import reducers from './reducers';
// import Apps from './components/app';
// const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div>
                <Appka />
            </div>
        );
    }
}

export default App;