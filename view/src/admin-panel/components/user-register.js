import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createUser } from "../../actions/admin-panel-actions";

class UserRegister extends Component {


    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.props.createNewUser)}>
                {this.props.createUser.data}
                <Field name="name" type="text" component={renderField} label="Name"/>
                <Field name="email" type="email" component={renderField} label="Email"/>
                <Field name="telephone" type="text" component={renderField} label="Telephone Number"/>
                <Field name="departmentRole" type="text" component={renderField} label="Department Role"/>
                Select Default Language<Field name="defaultLanguage" component="select">
                <option value=""></option>
                    <option value="PL">Polski</option>
                    <option value="ENG">Angielski</option>
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
    console.log(state);
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
