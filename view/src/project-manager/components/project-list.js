import React, {Component} from 'react';
import { connect } from "react-redux";
import { getAllProjects } from "../actions";

class ProjectList extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.getAllProjects();
    }

    render() {
        return (
            <div>
                List!
            </div>
        );
    }
}
//TODO Add list display based on list and list item

const mapStateToProps = (state) =>{
    console.log(state.projectsList);
    return ({projectList: state.projectsList})
};

const mapDispatchToProps = (dispatch) => ({
    getAllProjects: () => dispatch(getAllProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);