import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
    </div>
);


const RenderBenefits = ({ fields }) => (
    <div>
        {fields.map((benefit, index) => (
            <div key={index}>
                <Field
                    name={`${benefit}.benefit`}
                    type="text"
                    component={renderField}
                    label="cośtam korzyść"
                />
                <button
                    type="button"
                    title="Remove Member"
                    onClick={() => fields.remove(index)}
                >X</button>
            </div>
        ))}
        <button type="button" onClick={() => fields.push({})}>
            +
        </button>
    </div>
);

const FieldArraysForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <FieldArray name="members" component={RenderBenefits} />
            <div>
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'fieldArrays'
})(FieldArraysForm)

