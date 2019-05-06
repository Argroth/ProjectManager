import React, {Component} from 'react';
import { connect } from "react-redux";
import { getAllProjects } from "../actions";
import ListItem from "./project-list-item";

class ProjectList extends Component {
    constructor(props) {
        super(props);
    };

    renderList(){
        console.log(this.props.projectList);

        if(!this.props.projectList){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return this.props.projectList.map(project => {
            return(
                <ul key={project._id}>
                    <ListItem data={project} />
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

//TODO Add list display based on list and list item

const mapStateToProps = (state) =>{
    console.log(state.projectsList);
    return ({projectList: state.projectsList.projectList})
};

const mapDispatchToProps = (dispatch) => ({
    getAllProjects: () => dispatch(getAllProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);