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
            <div>
            <Menu tabular>
                <Menu.Item as={Link} to='/' name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick}>Home</Menu.Item>
                <Menu.Item as={Link} to='/auth/' name='Auth' active={activeItem === 'Auth'} onClick={this.handleItemClick}>Auth</Menu.Item>
                <Menu.Item as={Link} to='/admin-panel/' name='AdminPanel' active={activeItem === 'AdminPanel'} onClick={this.handleItemClick}>Admin Panel</Menu.Item>
                <Menu.Item as={Link} to='/project-manager/' name='ProjectManager' active={activeItem === 'ProjectManager'} onClick={this.handleItemClick}>ProjectManager</Menu.Item>
                <Menu.Item as={Link} to='/test/' name='Test' active={activeItem === 'Test'} onClick={this.handleItemClick}>Test</Menu.Item>
            </Menu>
            </div>
        );
    }
}

export default Navbar;