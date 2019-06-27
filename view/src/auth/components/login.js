import React, {Component} from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from "redux-form";
import { login } from "../actions";

import { LanguageContext } from "../../context";


class Login extends Component {
    constructor(props) {
        super(props);
    }

    renderForm(){
        const {handleSubmit, submitting, } = this.props;
        const { Consumer } = LanguageContext;
        return(
            <div>
                <Consumer>
                    {x => <p>{ x }</p>}
                </Consumer>
                {this.props.verifyMessage}
                <form onSubmit={handleSubmit(this.props.loginUser)}>
                    <Field name="email" type="email" component={renderField} label="Email"/>
                    <Field name="password" type="password" component={renderField} label="Password"/>
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
    }
     if(!values.password){
        errors.password = 'Required'
    }


    return errors
};

const mapStateToProps = (state) => {
    console.log(state);
  return state;
};

const mapDispatchToProps = (dispatch) => ({
    loginUser: (values) => dispatch(login(values))
});

export default reduxForm({
    form: 'CreatePasswordForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);