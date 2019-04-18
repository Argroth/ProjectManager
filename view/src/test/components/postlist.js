import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {fetchUsers, editUser} from "../actions";

class Postlist extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        if(!this.props.users){
            return (
                <div>
                    Loading ...
                </div>
            )
        }else
        return(
            this.props.users.map(x => {
                return(
                    <div key={x._id} onClick={() => this.props.selectUser(x)}>
                            <li>{x.meta.name}</li>
                    </div>
                )
            })
    )}
}

const mapStateToProps = (state) => {
    console.log(state);
  return {
      users: state.users.data
  };
};

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
    selectUser: (x) => dispatch(editUser(x))

});

export default connect(mapStateToProps, mapDispatchToProps)(Postlist);