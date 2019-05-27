import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });



    render() {
        const { activeItem } = this.state;

        return (
            <Menu secondary>
                <Menu.Item as={Link} to='/admin-panel/user-module/' name='UserModule' active={activeItem === 'UserModule'} onClick={this.handleItemClick}>Users</Menu.Item>
                <Menu.Item as={Link} to='/admin-panel/project-manager' name='ProjectModule' active={activeItem === 'ProjectModule'} onClick={this.handleItemClick}>Project Module</Menu.Item>
                <Menu.Item as={Link} to='/admin-panel/calendar' name='Calendar' active={activeItem === 'Calendar'} onClick={this.handleItemClick}>Calendar</Menu.Item>
            </Menu>

        );
    }
}

export default Navbar;