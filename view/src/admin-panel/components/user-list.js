import React, {Component} from 'react';
import axios from 'axios';

import ListItem from './user-list-item';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        this.getAllUsers();
    }

    async getAllUsers() {
        const response = await axios.get('http://localhost:5000/getallusers');
    this.setState({userList: response.data});
    };




    render() {
        return (
            this.state.userList.map(x => {
                return(
                    <ul key={x._id}>
                          <ListItem data={x}/>
                    </ul>
                )
            })
        );
    }
}

export default UserList;