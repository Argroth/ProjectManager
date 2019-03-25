import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchTask } from "../actions";

class TasksShow extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount(){
        const { id } =  this.props.match.params;
        this.props.fetchTask(id);
    }


    render() {
        const {task} = this.props;

        if(!task){
            return <div><h1>Loading ...</h1></div>;
        }

        return (
            <div>
                {task.id}
            </div>
        );
    }

}

// function mapStateToProps({ tasks }, ownProps){
//     return {task: tasks[ownProps.match.params.id]};
// }

export default connect(null, {fetchTask})(TasksShow);