import React, {Component} from 'react';
import { connect } from "react-redux";
import { getAllProjects } from "../actions";
import ListItem from "./project-list-item";
import LinkButton from "../../common-components/link-button";

class ProjectList extends Component {
    constructor(props) {
        super(props);
    };

    renderList(){
        if(!this.props.projectList){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return this.props.projectList.reverse().map(project => {
            return(
                <ul key={project._id}>
                    <ListItem data={project} />
                    <LinkButton to={`/project-manager/project/${project._id}`}>Show Project</LinkButton>
                </ul>

            )
        })
    };


    componentDidMount() {
        this.props.getAllProjects();
    }


    render() {
        return (
            <div>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return ({projectList: state.projectsList.projectList})
};

const mapDispatchToProps = (dispatch) => ({
    getAllProjects: () => dispatch(getAllProjects())

});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);