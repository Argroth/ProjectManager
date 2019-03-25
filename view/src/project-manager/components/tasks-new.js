import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTask } from "../actions";

class TasksNew extends React.Component {

    renderField(field){
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type="text"
                    {...field.input}
                    className="form-control"
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.createTask(values,() =>{
            this.props.history.push('/');
        });
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Task Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={"/"} className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //validate the input from 'values'
    if(!values.title || values.title.length < 3){
        errors.title = "Enter a title that is at least 3 characters!";
    }
    if(!values.categories){
        errors.categories = "Enter a tag!";
    }
    if(!values.content){
        errors.content = "Enter a content!";
    }

    //if errors is empty, the form is fine to submit. Redux assumes it's all ok with values.
    //If errors has any properties, redux assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'TasksNewForm'
})(
    connect(null,{ createTask })(TasksNew)
);