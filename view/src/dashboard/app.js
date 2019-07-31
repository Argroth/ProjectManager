import React, {Component} from 'react';
import {applyMiddleware, createStore} from "redux";
import DashboardReducer from "../dashboard/reducers/index";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(DashboardReducer, applyMiddleware(thunk));

    }
    //<NavBar/>

    render() {
        return (
            <Provider store={this.store}>
            <div>
                    Dashboard main component

                </div>
            </Provider>

        );
    }
}

export default App;