import React, {Component} from 'react';
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';


class App extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        const { handleSubmit } = this.props;




        return (
            <form onSubmit={handleSubmit}>
                <Field
                    label="Name"
                    name="name"
                    component={renderField}
                />
            </form>
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

export default reduxForm({
    form: 'PostsNewForm'
})(
    connect(null, null)(App)
);