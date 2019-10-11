import React, {Component} from 'react';
import GanttChart from "./gantt-chart";
import TaskForm from './task-add-form';
import moment from 'moment';

export default class GanttComponent extends Component {
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
                <GanttChart data={this.props.data} tasks={this.props.data}/>
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
                        console.log(task);
                        return(
                            <tr>
                                <th>{task.taskID}</th>
                                <th>{task.taskName}</th>
                                <th>{moment(task.startDate).format('YYYY-MM-DD')}</th>
                                <th>{moment(task.endDate).format('YYYY-MM-DD')}</th>
                                <th>{task.duration}</th>
                                <th>{task.percentComplete}</th>
                                <th>{task.dependencies}</th>
                                <th>{task.resource}</th>
                                <th><input type="checkbox" checked={task.ignoreWeekends}/></th>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }
}
