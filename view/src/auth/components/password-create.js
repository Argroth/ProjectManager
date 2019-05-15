import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { verifyToken, createPassword } from "../actions";

class PasswordCreate extends Component {
    constructor(props) {
        super(props);

    }

    renderForm(){
        const {handleSubmit, submitting, } = this.props;

        return(
            <div>
                {this.props.verifyMessage}
                <form onSubmit={handleSubmit(this.props.createPassword)}>
                    <Field name="password" type="password" component={renderField} label="Password"/>
                    <Field name="password2" type="password" component={renderField} label="Confirm Password"/>
                    <div>
                    <button type="submit" disabled={submitting}>Submit</button>
                    </div>
                </form>
            </div>
        )
}



    componentDidMount() {
        this.props.verifyToken(this.props.match.params.token);
    }

    render() {
        if (!this.props.verifyMessage) {
            return (
                <div>
                    Verifying token ...
                </div>
            )
        } else {
            return (
                <div>
                    {this.props.verifyMessage === 'Token is incorrect' || this.props.passwordMessage === 'Password created successfully' ? this.props.verifyMessage && this.props.passwordMessage : this.renderForm()}
                </div>
            );
        }
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
    if(!values.password){
        errors.password = 'Required'
    }
    else if(values.password.length < 6){
        errors.password = 'Password must be at least 6 characters long'
    }
    if(!values.password2){
        errors.password2 = 'Required'
    }
    else if(values.password2.length < 6){
        errors.password2 = 'Password must be at least 6 characters long'
    }
    if(values.password !== values.password2){
        errors.password = 'Passwords must be the same';
        errors.password2 = 'Passwords must be the same';
    }

    return errors
};

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return ({
        initialValues: ownProps.match.params.token,
        verifyMessage: state.messageToken.data,
        passwordMessage: state.messageCreatingPassword.data
    });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    verifyToken: (token) => dispatch(verifyToken(token, 'verify')),
    createPassword: (values) => dispatch(createPassword(values, 'createPassword', ownProps.match.params.token))
});

export default reduxForm({
    form: 'CreatePasswordForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(PasswordCreate)
);