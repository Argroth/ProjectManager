import React, {Component} from 'react';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

// import reducers from './reducers';
// import Apps from './components/app';
// const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <div>

                123

                {/*<Provider store={store}>*/}
                {/*    <Apps />*/}
                {/*</Provider>*/}
            </div>
        );
    }
}

export default App;