import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import moment from 'moment';
import _ from 'lodash';

import { editTask } from "../../../../actions/project-manager-actions";

class TaskEditForm extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        const { handleSubmit, submitting, reset} = this.props;
        return (
            <div>
                <form  onSubmit={handleSubmit(this.props.editTask)}>
                    <Field name="taskID" type="text" input={{disabled: true}} component={this.RenderField} label="TaskID"/>
                    <Field name="taskName" type="text" component={this.RenderField} label="Task Name"/>
                    <Field name="resource" component="select">
                        <option></option>

                    </Field>
                    <br/>
                    Ignore holidays<Field name="ignoreWeekends" type="checkbox" component={this.RenderField}/>
                    <Field name="startDate" type="date" component={this.RenderField} label="Start Date"/>
                    <Field name="endDate" type="date" component={this.RenderField} label="End Date"/>
                    <Field name="duration" type="number" component={this.RenderField} label="Ending in: ... days"/>
                    <Field name="percentComplete" component='select'>
                        <option ></option>
                        <option value='0%'>0%</option>
                        <option value='25%'>25%</option>
                        <option value='50%'>50%</option>
                        <option value='75%'>75%</option>
                        <option value='100%'>100%</option>
                    </Field>
                    <br/>
                    Select dependent task: <Field name="dependencies" component="select">
                    <option></option>
                    {this.props.tasks.map(task => {
                        return <option value={task.taskID}>{task.taskName}</option>
                    })}
                </Field>
                    <div>
                        <button type="submit" disabled={submitting} >Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    RenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div>
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}

const warn = (values, props) => {
    const calendar = props.calendar;
    const warnings = {};

    if(values.ignoreWeekends === false && values.duration && values.startDate) {
        const startDate = _.find(calendar, {day: values.startDate}).day;
        const duration = values.duration;
        let period = [];

        if(startDate){
            calendar.map(x => {
                if(x.day > startDate && x.day < calendar[calendar.length-1].day){
                    if(x.offWork === false){period.push(x)}
                }
            })
        }

        warnings.duration = `Wybrałeś datę: ${period[duration].day} ( ${period[duration].name} )`;
    }

    if(values.ignoreWeekends === true && values.duration && values.startDate) {
        const startDate = _.find(calendar, {day: values.startDate}).day;
        const duration = values.duration;
        let period = [];

        if(startDate){
            calendar.map(x => {
                if(x.day > startDate && x.day < calendar[calendar.length-1].day){
                    period.push(x);
                }
            })
        }

        warnings.duration = `Wybrałeś datę: ${period[duration-1].day} ( ${period[duration-1].name} )`;
    }

    return warnings;
};

const validate = (values, props) => {
    const calendar = props.calendar;
    const errors = {};
    if (!values.taskId) {
        errors.taskId = 'Required'
    }

    //validate start date
    if(values.ignoreWeekends === false && values.startDate){
        const dayFound = _.find(calendar, {day: values.startDate});

        if(dayFound.offWork === true){
            let tempArrayDate = [];
            let dateRange = moment(dayFound.day).add(40, 'days');

            calendar.map(x => {
                if(x.day > dayFound.day && x.day < dateRange.format('YYYY-MM-DD')){
                    tempArrayDate.push(x);
                }
            });

            errors.startDate = `Wybrałeś datę: ${dayFound.day} (${dayFound.name}). Sugerowana data rozpoczęcia zadania to: ${tempArrayDate.find((x) => {return x.offWork === false}).day} lub zaznacz ignorowanie dni świątecznych`;
        }
    }

    //validate end date
    if(values.ignoreWeekends === false && values.endDate){
        const dayFound = _.find(calendar, {day: values.endDate});

        if(dayFound.offWork === true){
            let tempArrayDate = [];
            let dateRange = moment(dayFound.day).add(40, 'days');

            calendar.map(x => {
                if(x.day > dayFound.day && x.day < dateRange.format('YYYY-MM-DD')){
                    tempArrayDate.push(x);
                }
            });

            errors.endDate = `Wybrałeś datę: ${dayFound.day} ( ${dayFound.name} ). Sugerowana data zakończenia zadania to: ${tempArrayDate.find((x) => {return x.offWork === false}).day} lub zaznacz ignorowanie dni świątecznych`;
        }

    }

    if(values.dependencies && values.startDate){
        const tasks = props.tasks;
        tasks.map(taskDestructurized => {
            if(values.dependencies === taskDestructurized.taskID){
                console.log(moment(taskDestructurized.endDate));
                console.log(taskDestructurized.endDate);
                if(values.startDate < taskDestructurized.endDate){
                    errors.startDate = `Nie może zaczynać się przed końcem zadania: ${taskDestructurized.taskName} (${moment(taskDestructurized.endDate).format('YYYY-MM-DD')})`
                }
            }
        });
    }
    return errors;
};

const mapStateToProps = (state, ownProps) => {
    ownProps.task.startDate = moment(ownProps.task.startDate).format('YYYY-MM-DD');
    ownProps.task.endDate = moment(ownProps.task.endDate).format('YYYY-MM-DD');

        return ({
            tasks: ownProps.tasks,
            calendar: state.calendar,
            initialValues: ownProps.task
        })
};

const mapDispatchToProps = (dispatch) => ({
    editTask: (task) => dispatch(editTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditTaskForm',
    warn,
    validate,
    enableReinitialize: true
})(TaskEditForm));
