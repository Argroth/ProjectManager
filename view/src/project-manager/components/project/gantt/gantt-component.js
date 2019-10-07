import React, {Component} from 'react';
import GanttChart from "./gantt-chart";
import TaskForm from './task-add-form';
import EditTaskForm from './task-edit-form';
import {CardBody} from "reactstrap";

class GanttComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddTaskForm: false,
            taskDate: null
        };
    }

    showFormToAddTask = () => {
        this.setState({showAddTaskForm: !this.state.showAddTaskForm})
    };

    render() {
        return (
            <div>
                <input type="button" value="Add Task" onClick={this.showFormToAddTask}/>
                {this.state.showAddTaskForm? <TaskForm projectID={this.props.projectID} calendar={this.props.calendar} tasks={this.props.data}/> : null}
                <GanttChart projectID={this.props.projectID} data={this.props.data} calendar={this.props.calendar} />

                <table>
                    <tr>
                        <th>Task ID</th>
                        <th>Task Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration</th>
                        <th>Percent completed</th>
                        <th>Dependencies</th>
                        <th>Resources</th>
                        <th>Ignore Weekends</th>
                    </tr>
                    {this.props.data.map(task => {
                        return(
                            <tr>
                                <th>{task.taskID}</th>
                                <th>{task.taskName}</th>
                                <th>{task.startDate}</th>
                                <th>{task.endDate}</th>
                                <th>{task.duration}</th>
                                <th>{task.percentComplete}</th>
                                <th>{task.dependencies}</th>
                                <th>{task.resource}</th>
                                <th>{task.ignoreWeekends}</th>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}

export default GanttComponent;