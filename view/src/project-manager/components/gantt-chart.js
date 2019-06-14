import React, {Component} from 'react';
import { Chart } from "react-google-charts";

import AddTaskForm from './task-add-form';


export default class GanttChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTaskForm: false,
            taskDate: null
        };
    };


     getData = () => {
         const taskData = [
             [
                 { type: 'string', label: 'Task ID' },
                 { type: 'string', label: 'Task Name' },
                 { type: 'date', label: 'Start Date' },
                 { type: 'date', label: 'End Date' },
                 { type: 'number', label: 'Duration' },
                 { type: 'number', label: 'Percent Complete' },
                 { type: 'string', label: 'Dependencies' },
             ],
         ];

         this.props.data.map(task => {
            task.data.map(task => {
                 return taskData.push([
                     task[0],
                     task[1],
                     new Date(task[2]),
                     new Date(task[3]),
                     task[4],
                     task[5],
                     task[6],
                 ])
             })
         });

         return (taskData);
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
                    data= {this.getData()}

                    rootProps={{ 'data-testid': '4' }}
                    controls={[
                        {
                            controlType: 'StringFilter',
                            options: {
                                filterColumnIndex: 1,
                                matchType: 'any', // 'prefix' | 'exact',
                                ui: {
                                    label: 'Search by name',
                                },
                            },
                        },
                    ]}
                />
            </div>
        );
    }
}