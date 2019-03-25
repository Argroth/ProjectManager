import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchTasks } from "../actions";


class TasksIndex extends Component {
    componentDidMount(){
        this.props.fetchTasks();
    }


    renderTasks() {
        return _.map(this.props.tasks, task => {
            return(
                <li className="list-group=item" key={task.id}>
                    {task.title}
                    <p>id:{task.id}</p>

                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/tasks/new">
                        Add a Task
                    </Link>
                </div>
                <h3>Tasks: </h3>
                <ul className="list-group">
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, {fetchTasks})(TasksIndex);