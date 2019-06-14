import React, {Component} from 'react';
import {Field, FieldArray, reduxForm} from "redux-form";
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
                        <Field name="projectName" type="text" component={renderField} label="Project Name"/>
                        <Field name="projectGoal" type="text" component={renderField} label="Project Goal"/>
                        <Field name="projectScope" type="text" component={renderField} label="Project Scope"/>
                        <Field name="projectReasons" type="text" component={renderField} label="Project Reasons"/>
                        <FieldArray name="projectBenefits" component={renderBenefits}/>
                        <Field name="projectStartDate" type="date" component={renderField} label="Project Start Date"/>
                        <Field name="projectEndDate" type="date" component={renderField} label="Project End Date"/>
                        <Field name="projectBudget" type="number" component={renderField} label="Project Budget"/>
                        <Field name="currency" component="select">
                            <option></option>
                            <option value="PLN">Zł</option>
                            <option value="Euro">Euro</option>
                        </Field>
                        <Field name="projectManager" type="text" component={renderField} label="Project Manager"/>
                        <FieldArray name="projectSteeringComitee" component={renderMembersOfSteeringComitee}/>
                        <FieldArray name="projectTeam" component={renderTeams}/>
                        <FieldArray name="projectStage" component={renderStages}/>
                        <FieldArray name="projectKPI" component={renderKPIs}/>
                        <Field name="projectRisk" type="text" component={renderField} label="Project Risk"/>
                        <Field name="projectOrganization" type="text" component={renderField} label="Project Organization"/>
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

const renderBenefitFields = (benefit, index, fields) => (
    <li key={index}>
        <h4>Benefit #{index + 1}:</h4>
        <Field
            name={`${benefit}.projectBenefitData`}
            type="text"
            component={renderField}
            label="Benefit"/>
        <button
            type="button"
            title="Remove Benefit"
            onClick={() => fields.remove(index)}>X</button>
    </li>
);

const renderBenefits = ({ fields }) => (
    <ul>
        {fields.map(renderBenefitFields)}
        <button type="button" onClick={() => fields.push({})}>Add Benefit</button>
    </ul>
);

const renderTeamFields = (member, index, fields) => (
    <li key={index}>
        <h4>Member #{index + 1}:</h4>
        <Field
            name={`${member}.projectTeamMember`}
            type="text"
            component={renderField}
            label="Team Member"/>
        <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}>X</button>
    </li>
);

const renderTeams = ({ fields }) => (
    <ul>
        {fields.map(renderTeamFields)}
        <button type="button" onClick={() => fields.push({})}>Add Team Member</button>
    </ul>
);
const renderStagesFields = (stage, index, fields) => (
    <li key={index}>
        <h4>Stage #{index + 1}:</h4>
        <Field
            name={`${stage}.projectStage`}
            type="text"
            component={renderField}
            label="Stage"/>
            <Field
            name={`${stage}.projectStageResult`}
            type="text"
            component={renderField}
            label="Stage Result"/>
        <button
            type="button"
            title="Remove Stage"
            onClick={() => fields.remove(index)}>X</button>
    </li>
);

const renderStages = ({ fields }) => (
    <ul>
        {fields.map(renderStagesFields)}
        <button type="button" onClick={() => fields.push({})}>Add Stage</button>
    </ul>
);
const renderKPIFields = (kpi, index, fields) => (
    <li key={index}>
        <h4>KPI #{index + 1}:</h4>
        <Field
            name={`${kpi}.kpiName`}
            type="text"
            component={renderField}
            label="KPI"/>
            <Field
            name={`${kpi}.kpiTargetValue`}
            type="text"
            component={renderField}
            label="KPI Target Value"/>
        <button
            type="button"
            title="Remove KPI"
            onClick={() => fields.remove(index)}>X</button>
    </li>
);

const renderKPIs = ({ fields }) => (
    <ul>
        {fields.map(renderKPIFields)}
        <button type="button" onClick={() => fields.push({})}>Add KPI</button>
    </ul>
);
const renderSteeringComitee = (member, index, fields) => (
    <li key={index}>
        <h4>Comitee member #{index + 1}:</h4>
        <Field
            name={`${member}.steeringComiteeMember`}
            type="text"
            component={renderField}
            label="Steering comitee member"/>
        <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}>X</button>
    </li>
);

const renderMembersOfSteeringComitee = ({ fields }) => (
    <ul>
        {fields.map(renderSteeringComitee)}
        <button type="button" onClick={() => fields.push({})}>Project Owner / Steering Comitee</button>
    </ul>
);



const validate = values => {
    const errors = {};
    if (!values.projectName) {
        errors.projectName = 'Required'
    }
    return errors
};


const mapStateToProps = (state) => {
    return ({message: state.projectCreate.data})
};

const mapDispatchToProps = (dispatch) => ({
        createNewProject: (values) => dispatch(createProject(values))
});

export default reduxForm({
    form: 'NewProjectForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
);