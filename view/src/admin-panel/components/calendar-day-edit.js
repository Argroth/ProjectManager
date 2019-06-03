import React, {Component} from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from "redux-form";
import { updateDate } from "../actions";

class CalendarDayEdit extends Component {
    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.props.submitDateEdit)}>
                    <label>{this.props.day}</label>
                    <Field name="offWork" type="checkbox" component={renderField} label="Off work"/>
                    <Field name="description" type="text" component={renderField} label="Description"/>
                    <button type="submit" onClick={() => {if(window.confirm('Are you sure?')){}}}>Submit</button>
                </form>
            </div>
        );
    }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

//TODO Validate
const validate = values => {
    const errors = {};
    return errors
};

const mapStateToProps = (state) => {
        return({
            day: state.selectedDay.day,
            dateUpdate: state.updateDate.status,
            initialValues: {
                _id: state.selectedDay._id,
                date: state.selectedDay.day,
                offWork: state.selectedDay.offWork,
                description: state.selectedDay.description
            }
     })
};



const mapDispatchToProps = (dispatch) => ({
      submitDateEdit: (values) => dispatch(updateDate(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditDayForm',
    validate,
    enableReinitialize: true
})(CalendarDayEdit));
