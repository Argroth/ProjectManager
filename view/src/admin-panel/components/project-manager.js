import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ProjectManager extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div>
                <Link to="/admin-panel/project-manager/project-list">List of Projects</Link>
            </div>
        );
    }
}

export default ProjectManager;