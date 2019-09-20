import React, {Component} from 'react';
import Chart from "react-google-charts";

import AddTaskForm from './task-add-form';
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";


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
                 { type: 'string', label: 'Resource' },
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
                     task[2],
                     new Date(task[3]),
                     new Date(task[4]),
                     task[5],
                     task[6],
                     task[7],
                 ])
             })
         });

         return (taskData);
     };

    showFormToAddTask = () => {
        this.setState({showAddTaskForm: !this.state.showAddTaskForm})
    };

    render() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0">
                        Gantt
                    </CardTitle>
                </CardHeader>
                <CardBody>
                <input type="button" value="Add Task" onClick={this.showFormToAddTask}/>
                {this.state.showAddTaskForm? <AddTaskForm projectID={this.props.projectID} calendar={this.props.calendar} tasks={this.props.data}/> : null}
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data= {this.getData()}

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
                    rootProps={{ 'data-testid': '3' }}
                />
                </CardBody>
            </Card>
        );
    }
}