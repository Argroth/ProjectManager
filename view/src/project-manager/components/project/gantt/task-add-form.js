import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createNewTask } from "../../../../actions/project-manager-actions";


class TaskAddForm extends Component {
    constructor(props) {
        super(props);

    };


    onChange = (values) => {

    };

    render() {
        const { handleSubmit, submitting } = this.props;
            return (
                <div>
                    <form onSubmit={handleSubmit(this.props.createNewTask)}>
                        <Field name="taskId" type="text" component={renderField} label="TaskID" onChange={this.onChange()}/>
                        <Field name="taskName" type="text" component={renderField} label="Task Name"/>
                        <Field name="startDate" type="date" component={renderField} label="Start Date"/>
                        <Field name="endDate" type="date" component={renderField} label="End Date"/>
                        <Field name="duration" type="number" component={renderField} label="Ending in: ... days"/>
                        Ignore free days?<Field name="ignoreWeekends" type="checkbox" component={renderField}/>
                        <Field name="percentage" type="number" component={renderField} label="Percent Completion"/>
                        Select dependent task: <Field name="dependencies" component="select">
                            <option></option>
                            {this.props.projectViewData.ganttChart.map(outerArray => {
                                 return outerArray.data.map(innerArrayObject => {
                                           return <option value={innerArrayObject[0]}>{innerArrayObject[1]}</option>
                                })
                            })}
                        </Field>
                        <div>
                            <button type="submit" disabled={submitting}>Submit</button>
                        </div>
                    </form>
                </div>
            );
    }
}

const validate = values => {
    const errors = {};
    if (!values.taskId) {
        errors.taskId = 'Required'
    }else if(values.taskId < 4){
        errors.taskId = 'Task ID has to have at least 3 chars'
    }
    if (!values.taskName) {
        errors.taskName = 'Required'
    }else if(values.taskName < 4){
        errors.taskName = 'Task name has to have at least 3 chars'
    }
    if (!values.startDate) {
        errors.startDate = 'Required'
    }
    if (!values.endDate) {
        errors.endDate = 'Required'
    }
    if(values.startDate > values.endDate) {
        errors.startDate = 'The end date cant be before the start date'
    }
    if (!values.percentage) {
        errors.percentage = 'Required'
    }else if(values.percentage < 0 || values.percentage > 100){
        errors.percentage = 'Percentage must be between 0 and 100'
    }
    return errors
};


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>))}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return ({
        projectViewData: state.projectData
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createNewTask: (task) => dispatch(createNewTask(task, ownProps.projectID))
});


export default reduxForm({
     form: 'addNewTaskForm',
     validate
})(
    connect(mapStateToProps, mapDispatchToProps)(TaskAddForm)
);
