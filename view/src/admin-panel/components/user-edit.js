import React, {Component} from 'react';
import { connect } from "react-redux";
import {Field, reduxForm} from "redux-form";
import { getUser } from "../../actions/admin-panel-actions";

class UserEdit extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getUserData(this.props.userID);
    };


    renderForm(){
        const {handleSubmit, submitting, } = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit(this.props.submitEditedUser)}>
                    <Field name="name" type="text" component={renderField} label="Name"/>
                    <Field name='company' component='select'>
                        <option value="Teleskop">Teleskop</option>
                        <option value="Montel">Montel</option>
                        <option value="Henschel">Henschel</option>
                        <option value="Teleyard">Teleyard</option>
                    </Field>
                    <Field name="department" type="text" component={renderField} label="Department"/>
                    <Field name="departmentRole" type="text" component={renderField} label="Department Role"/>
                    <Field name='globalRole' component='select'>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Supervisor">Supervisor</option>
                    </Field>
                    <div>
                        <label>Permissions</label>
                        <label><Field name="adminPanel" component={renderField} type="checkbox" value="adminPanel"/>Panel Admin</label>
                        <label><Field name="projectManager" component={renderField} type="checkbox" value="projectManager"/>Project Manager</label>
                    </div>
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

//TODO Validate
const validate = values => {
    const errors = {};
    return errors
};

//TODO error on edit user missed id - add 404 component as default
const mapStateToProps = (state, ownProps) => {
if(!state.selectedUserToEdit.data){
    return ({
        userID: ownProps.match.params.user,
        initialValues: {
            name: '',
            company: '',
            department: '',
            departmentRole: '',
            globalRole: '',
            adminPanel: '',
            projectManager: ''
        }
    })
 } else{
        return({
            userID: ownProps.match.params.user,
            initialValues: {
                name: state.selectedUserToEdit.data.meta.name,
                company: state.selectedUserToEdit.data.meta.company,
                department: state.selectedUserToEdit.data.meta.department,
                departmentRole: state.selectedUserToEdit.data.meta.departmentRole,
                globalRole: state.selectedUserToEdit.data.globalRole,
                adminPanel: state.selectedUserToEdit.data.access.adminPanel,
                projectManager: state.selectedUserToEdit.data.access.projectManager
            }
        })
    }
};


const mapDispatchToProps = (dispatch) => ({
    getUserData: (userID) => dispatch(getUser(userID)),
    submitEditedUser: () => dispatch()
});


//TODO edit export order in other files!!!!@#!@#!#!$@!$@!
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditUserForm',
    validate,
    enableReinitialize: true
})(UserEdit));


