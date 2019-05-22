import React, {Component} from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from "redux-form";
import { resetPassword } from "../actions";

class PasswordReset extends Component {
    constructor(props) {
        super(props);

    }

    renderForm(){
        const {handleSubmit, submitting, } = this.props;
        return(
            <div>
                {this.props.message}
                <form onSubmit={handleSubmit(this.props.resetPassword)}>
                    <Field name="email" type="email" component={renderField} label="E-mail"/>
                    <div>
                        <button type="submit" disabled={submitting}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderForm()}
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


const validate = values => {
    const errors = {};
    if(!values.email){
        errors.email = 'Required'
    } else if (!/^[A-Z.]+@telemond-holding.com$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
};

const mapStateToProps = (state) => {
    return ({message: state.messageResettingPassword.data});
};

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (values) => dispatch(resetPassword(values))
});

export default reduxForm({
    form: 'ResetPasswordForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
);