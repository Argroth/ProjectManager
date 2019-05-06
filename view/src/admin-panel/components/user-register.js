import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createUser } from "../actions";

class UserRegister extends Component {


    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.createNewUser)}>
                <Field name="name" type="text" component={renderField} label="Name"/>
                <Field name="email" type="email" component={renderField} label="Email"/>
                <Field name="department" type="text" component={renderField} label="Department"/>
                <Field name="departmentRole" type="text" component={renderField} label="Department Role"/>
                <Field name="company" component="select">
                    <option></option>
                    <option value="Teleskop">Teleskop</option>
                    <option value="Montel">Montel</option>
                    <option value="Henschel">Henschel</option>
                    <option value="Teleyard">Teleyard</option>
                </Field>
                <div>
                    <button type="submit" disabled={submitting}>Submit</button>
                </div>
            </form>
        );
    }
}


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }else if(values.name < 4){
        errors.name = 'Name has to have at least 3 chars'
    }
    if (!values.email){
        errors.email = 'Required'
    } else if (!/^[A-Z.]+@telemond-holding.com$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.department){
        errors.department = 'Required'
    }
    if(!values.departmentRole){
        errors.departmentRole = 'Required'
    }
    if(!values.company){
        errors.company = 'Required'
    }

    return errors
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    createNewUser: (values) => dispatch(createUser(values))
});

export default reduxForm({
    form: 'NewUserForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(UserRegister)
);