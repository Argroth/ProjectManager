import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div>
                <li><Link to='/admin-panel/user-module/create-user'>Create new user</Link></li>
                <li><Link to='/admin-panel/user-module/user-list'>User list</Link></li>
            </div>
        );
    }
}

export default User;