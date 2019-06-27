import React, {Component} from 'react';
import LinkButton from "../../common-components/link-button";

class ProjectListItem extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <li>{this.props.data.projectName}  |||
                    <LinkButton to={`/project-manager/project/${this.props.data._id}`}>Show Project</LinkButton>
                    <LinkButton to={`/project-manager/project-edit/${this.props.data._id}`}>Edit Project</LinkButton>
                </li>
            </div>
        );
    }
}

export default ProjectListItem;