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
                <Menu.Item as={Link} to='/project-manager/create-project' name='CreateProject' active={activeItem === 'CreateProject'} onClick={this.handleItemClick}>Create Projects</Menu.Item>
                <Menu.Item as={Link} to='/project-manager/project-list' name='ProjectList' active={activeItem === 'ProjectList'} onClick={this.handleItemClick}>Project List</Menu.Item>
                <Menu.Item as={Link} to='/project-manager/contributed-projects' name='ContributedProjects' active={activeItem === 'ContributedProjects'} onClick={this.handleItemClick}>Contributed Projects</Menu.Item>
            </Menu>

        );
    }
}

export default Navbar;