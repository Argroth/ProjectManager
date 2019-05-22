import React, {Component} from 'react';
import { Chart } from "react-google-charts";

import AddTaskForm from './task-add-form';


export default class GanttChart extends Component {
    constructor(props) {
        super(props);

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
                            new Date(2018, 2, 5),
                            new Date(2018, 2, 7),
                            null,
                            25,
                            null,
                        ],
                        [
                            'Write',
                            'Write paper',
                            new Date(2019, 2, 5),
                            new Date(2019, 5, 9),
                            259200000,
                            25,
                            null,
                        ],
                        [
                            'Read',
                            'Read Docs',
                            new Date(2019, 6, 5),
                            new Date(2019, 8, 9),
                            259200000,
                            25,
                            'Research',
                        ],
                        [
                            'Get',
                            'Get Data',
                            new Date(2019, 5, 12),
                            new Date(2019, 5, 22),
                            259200000,
                            25,
                            'Write',
                        ]
                    ]}
                    rootProps={{ 'data-testid': '4' }}
                    controls={[
                        {
                            controlType: 'DateRangeFilter',
                            options: {
                                filterColumnLabel: 'Start Date',
                                ui: { format: { pattern: 'MM' } },
                            },
                        },
                    ]}
                />
            </div>
        );
    }
}
