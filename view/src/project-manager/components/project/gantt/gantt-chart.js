import React, {Component} from 'react';
import Chart from "react-google-charts";

import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import EditTask from './task-edit-form';


export default class GanttChart extends Component {
    constructor(props) {
        super(props);

        this.state = {task: null}
    }


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
                 return taskData.push([
                     task.taskID,
                     task.taskName,
                     task.resource,
                     new Date(task.startDate),
                     new Date(task.endDate),
                     task.duration,
                     task.percentComplete,
                     task.dependencies,
                 ])
         });

        return(taskData);
     };

selectedTask = (item) => {
    this.setState({task: this.props.data[item]});
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
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="Gantt"
                        loader={<div>Loading Chart</div>}
                        data={this.getData()}
                            chartEvents={[
                                    {
                                        eventName: 'select',
                                        callback: ({ chartWrapper }) => {
                                            const chart = chartWrapper.getChart();
                                            const selection = chart.getSelection();
                                            if (selection.length === 1) {

                                                this.selectedTask(selection[0].row);
                                            }
                                        },
                                    },
                        ]}
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
                        rootProps={{'data-testid': '3'}}
                    />
                    <br/><br/>
                    {this.state.task != null? <EditTask tasks={this.props.tasks} task={this.state.task}/>:''}
                </CardBody>
            </Card>
        );
    }
}