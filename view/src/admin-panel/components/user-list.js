import React, {Component} from 'react';
import { connect } from 'react-redux';
import LinkButton from '../../common-components/link-button';


import {fetchUsers,
        forceChangePassword,
        disableUser,
        enableUser
                    } from '../actions';

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
                    <LinkButton to={`/admin-panel/user-module/edit-user/${user._id}`}>View user</LinkButton>
                    <LinkButton onClick={() => {if(window.confirm('Do you really want to force user to change his password?'))this.props.forceUserToChangePassword(user)}}>Force Password Change</LinkButton>
                    <LinkButton onClick={() => {if(window.confirm('Disable user?'))this.props.disableUser(user)}}>Disable user</LinkButton>
                    <LinkButton onClick={() => {if(window.confirm('Enable user?'))this.props.enableUser(user)}}>Enable user</LinkButton>
                </ul>

            )
        })
    };

    render() {
        return (
                <div>
                    <h3>{this.props.message}</h3>
                    <SearchBar searchLabel='Search for user' />
                    {this.renderList()}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.selectedUser,
        userList: state.users.data
    }
};

const mapDispatchToProps = (dispatch) => ({
   fetchUsers: () => dispatch(fetchUsers()),
   forceUserToChangePassword: (user) => dispatch(forceChangePassword(user)),
   disableUser: (user) => dispatch(disableUser(user)),
   enableUser: (user) => dispatch(enableUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(UserList);