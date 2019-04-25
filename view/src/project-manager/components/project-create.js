import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createProject } from "../actions";

class ProjectCreate extends Component {
    constructor(props) {
        super(props);
    };


    render() {
        const {handleSubmit, submitting, } = this.props;
            return (
                <div>
                    <span>{this.props.message? <h1>{this.props.message}</h1> : null}</span>
                    <form onSubmit={handleSubmit(this.props.createNewProject)}>
                        <Field name="name" type="text" component={renderField} label="Name"/>
                        <Field name="description" type="textarea" component={renderTextArea} label="Description"/>
                        <Field name="owner" type="text" component={renderField} label="Owner"/>
                        <Field name="tags" type="text" component={renderField} label="Tags"/>
                        <div>
                            <button type="submit" disabled={submitting}>Submit</button>
                        </div>
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

const renderTextArea = ({input, label ,meta: { touched, error, warning }}) => (
    <div>
        <div>
            <textarea {...input} placeholder={label} rows="10" cols="40"/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }else if(values.name < 6){
        errors.name = 'Name has to have at least 5 chars'
    }
    if (!values.owner) {
        errors.owner = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    }
    if (!values.tags) {
        errors.tags = 'Required'
    }
    return errors
};


const warn = values => {
    const warnings = {};
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
};

const mapStateToProps = (state) => {
    return ({message: state.projectCreate.data})
};

const mapDispatchToProps = (dispatch) => ({
        createNewProject: (values) => dispatch(createProject(values))
});

export default reduxForm({
    form: 'NewProjectForm',
    validate,
    warn
})(
    connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
);