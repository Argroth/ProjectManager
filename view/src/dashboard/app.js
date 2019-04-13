import React, {Component} from 'react';
import Lang from './components/test';
import {Link} from "react-router-dom";



class App extends Component {
    render() {
        return (
            <div>
                <li><Link to="/auth">Auth</Link></li>
                <li><Link to="/admin-panel">Panel administracyjny</Link></li>
                <li><Link to="/project-manager">Project manager</Link></li>
                <li><Link to="/test">Test</Link></li>
                <Lang />
            </div>
        );
    }
}

export default App;