import React, {Component} from 'react';
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import _ from 'lodash';
import moment, {duration} from 'moment';

import { createNewTask } from "../../../../actions/project-manager-actions";


class TaskAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            duration: undefined
        }
    };

    onChange = (event) => {
      if(event.target.name === 'startDate'){
          this.setState({startDate: event.target.value})
      }else if(event.target.name === 'endDate'){
          this.setState({endDate: event.target.value});
      }else if(event.target.name === 'duration'){
          this.setState({duration: event.target.valueAsNumber})
      }
    };

    handleChange = () => {
        const a = moment(this.state.startDate);
        const b = moment(this.state.endDate);

        if(a && b){
                this.props.updateDuration(b.diff(a, 'days'));
        }
    };


    render() {
        const { handleSubmit, submitting } = this.props;
            return (
                <div>
                    <form onSubmit={handleSubmit(this.props.createNewTask)}>
                        <Field name="taskId" type="text" component={this.RenderField} label="TaskID"/>
                        <Field name="taskName" type="text" component={this.RenderField} label="Task Name"/>
                        <Field name="resource" component="select">
                            <option></option>
                            {this.props.projectViewData.projectStages.map(stage => {
                                return <option value={stage.name}>{stage.name}</option>
                            })}
                        </Field>
                        <br/>
                        Ignore holidays<Field name="ignoreWeekends" type="checkbox" component={this.RenderField}/>
                        <Field name="startDate" type="date" onChange={(value) => {this.onChange(value)}} onBlur={() => {this.handleChange()}} component={this.RenderField} label="Start Date"/>
                        <Field name="endDate" type="date" onChange={(value) => {this.onChange(value)}} onBlur={() => {this.handleChange()}} component={this.RenderField} label="End Date"/>
                        <Field name="duration" type="number" component={this.RenderField} onChange={(value) => {this.onChange(value)}} onBlur={() => {this.handleChange()}} label="Ending in: ... days"/>
                        <Field name="percentage" component='select'>
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
                            <button type="submit" disabled={submitting}>Submit</button>
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

    if(values.ignoreWeekends === false && values.duration > 0 && values.startDate) {
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
                    period.push(x)
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

            errors.startDate = `Wybrałeś datę: ${dayFound.day} ( ${dayFound.name} ). Sugerowana data rozpoczęcia zadania to: ${tempArrayDate.find((x) => {return x.offWork === false}).day} lub zaznacz ignorowanie dni świątecznych`;
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
                            if(values.startDate < taskDestructurized.endDate){
                                errors.startDate = `Nie może zaczynać się przed końcem zadania: ${taskDestructurized.taskName}`
                            }
                    }
        });
    }

    if(values.duration <= 0){
        errors.duration = 'Czas trwania nie może być mniejszy od 0';
    }

    return errors;
};

const mapStateToProps = (state) => {
    return ({
        projectViewData: state.projectData,
        tasks: state.taskList,
        stages: state.projectData.projectStages,
        calendar: state.calendar
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createNewTask: (task) => dispatch(createNewTask(task, ownProps.projectID)),
    updateDuration: (dur) => dispatch(change('addNewTaskForm', 'duration', dur))
});

export default reduxForm({
    form: 'addNewTaskForm',
    initialValues: {ignoreWeekends: false},
    validate,
    warn
})(
    connect(mapStateToProps, mapDispatchToProps)(TaskAddForm)
);
