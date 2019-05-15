import React, {Component} from 'react';

class UserListItem extends Component {
    constructor(props) {
        super(props);
    console.log(props);
    }



    render() {
        return (
            <div>
                <li>{this.props.data.meta.name}</li>

            </div>
        );
    }
}

export default UserListItem;