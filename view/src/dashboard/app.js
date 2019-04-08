import React, {Component} from 'react';
import Lang from './components/test';
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <li><Link to="/applogin">login app</Link></li>

                <Lang selectedLang="pl"/>
            </div>
        );
    }
}

export default App;