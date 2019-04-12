import React, {Component} from 'react';
import Lang from './components/test';
import {Link} from "react-router-dom";



class App extends Component {
    render() {
        return (
            <div>
                <li><Link to="/applogin">login app</Link></li>
                <li><Link to="/panel">Panel administracyjny</Link></li>

                <Lang />
            </div>
        );
    }
}

export default App;