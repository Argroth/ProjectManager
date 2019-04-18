import React, {Component} from 'react';
import { connect } from 'react-redux';
import LinkButton from '../../common-components/link-button';


import { fetchUsers, editUser } from '../actions';

import ListItem from './user-list-item';
import SearchBar from '../../common-components/search-bar';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []

        };
    };

    componentDidMount() {
       this.props.fetchUsers();
    }

    renderList(){
        if(!this.props.userList){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return this.props.userList.map(user => {
            return(
                <ul key={user._id}>
                    <ListItem Item data={user} />
                    <LinkButton to='/admin-panel/user-module/edit-user' onClick={() => this.props.selectUserToEdit(user)}>Edit User</LinkButton>
                </ul>

            )
        })
    };

    render() {
        return (
                <div>
                    <SearchBar searchLabel='Search for user' />
                    {this.renderList()}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        selectedUser: state.selectedUser,
        userList: state.users.data
    }
};

const mapDispatchToProps = (dispatch) => ({
   fetchUsers: () => dispatch(fetchUsers()),
   selectUserToEdit: (user) => dispatch(editUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(UserList);