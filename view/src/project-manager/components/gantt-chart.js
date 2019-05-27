import React, {Component} from 'react';
import { Chart } from "react-google-charts";

import AddTaskForm from './task-add-form';


export default class GanttChart extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            showAddTaskForm: false
        };
    };


    showFormToAddTask = () => {
        this.setState({showAddTaskForm: true})
    };

    render() {
        return (
            <div>
                <input type="button" value="Add task" onClick={this.showFormToAddTask}/>
                {this.state.showAddTaskForm? <AddTaskForm projectID={this.props.projectID}/> : null}
                <Chart
                    width={'90%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            { type: 'string', label: 'Task ID' },
                            { type: 'string', label: 'Task Name' },
                            { type: 'date', label: 'Start Date' },
                            { type: 'date', label: 'End Date' },
                            { type: 'number', label: 'Duration' },
                            { type: 'number', label: 'Percent Complete' },
                            { type: 'string', label: 'Dependencies' },
                        ],
                        [
                            'Research',
                            'Find sources',
                            '2018-03-06T23:00:00.000Z',
                            '2018-04-06T23:00:00.000Z',
                            null,
                            25,
                            null,
                        ], this.props.data[7], this.props.data[7]

                    ]}
                    rootProps={{ 'data-testid': '4' }}
                    controls={[
                        {
                            controlType: 'DateRangeFilter',
                            options: {
                                filterColumnLabel: 'Start Date',
                                ui: { format: { pattern: 'MM' } },
                                explorer: {axis: 'horizontal'}
                            },
                        },
                    ]}
                />
            </div>
        );
    }
}
