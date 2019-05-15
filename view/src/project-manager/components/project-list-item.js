import React, {Component} from 'react';

class ProjectListItem extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <li>{this.props.data._id}</li>
                <li>{this.props.data.name}</li>
            </div>
        );
    }
}

export default ProjectListItem;