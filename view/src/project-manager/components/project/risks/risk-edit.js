import React, {Component} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import { connect } from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {editRisk, getRisk} from "../../../../actions/project-manager-actions";

const kindOfRisk = [
    {value: "", label: "Wybierz z listy"},
    {value: "Zewnetrzne", label: "Zewnętrzne"},
    {value: "Organizacyjne", label: "Organizacyjne"},
    {value: "Techniczne", label: "Techniczne"},
    {value: "Związane z zarządzaniem", label: "Związane z zarządzaniem"}
];

const typeOfRisk = [
    {value: "", label: "Wybierz z listy", color:""},
    {value: "Pozytywne", label: "Pozytywne", color:"success"},
    {value: "Negatywne", label: "Negatywne", color:"danger"}
];

const probability = [
    {value: "", label: "Wybierz z listy"},
    {value: "1", label: "Niskie"},
    {value: "2", label: "Średnie"},
    {value: "3", label: "Wysokie"}
];

const consequences = [
    {value: "", label: "Wybierz z listy"},
    {value: "1", label: "Niskie"},
    {value: "2", label: "Średnie"},
    {value: "3", label: "Wysokie"}
];

const significanceValue = [
    {value: 0, label: "", color:""},
    {value: 1, label: "Mała", color:"primary"},
    {value: 2, label: "Mała", color:"primary"},
    {value: 3, label: "Średnia", color:"warning"},
    {value: 4, label: "Średnia", color:"warning"},
    {value: 6, label: "Duża", color:"danger"},
    {value: 9, label: "Duża", color:"danger"}
];

class EditRiskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            probability: this.props.probability,
            consequence: this.props.consequence
        }
    }

    componentDidMount() {
        this.props.getRisk();
    }


    RenderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <Input {...input} placeholder={label} type={type} rows="3"/>
            {touched && ((error && <span>{error}</span>))}
        </div>
    );

    RenderKindSelect = ({input}) => {
        return(
            <div>
                <Input
                    {...input}
                    type='select'
                    value={input.value}
                    onChange={(value) => input.onChange(value)}
                    onBlur={() => input.onBlur()}
                >
                    {kindOfRisk.map((risk, index) => {
                        return(
                            <option value={kindOfRisk[index].value}>{kindOfRisk[index].label}</option>
                        )
                    })}
                </Input>
            </div>
        )
    };

    RenderTypeSelect = ({input}) => {
        return(
            <div>
                <Input
                    {...input}
                    type='select'
                    value={input.value}
                    onChange={(value) => input.onChange(value)}
                    onBlur={() => input.onBlur()}
                >
                    {typeOfRisk.map((risk, index) => {
                        return(
                            <option value={typeOfRisk[index].value}>{typeOfRisk[index].label}</option>
                        )
                    })}
                </Input>
            </div>
        )
    };

    RenderProbabilitySelect = ({input}) => {
        const handleChange = (value) => {
            input.onChange(value);
            this.setState({probability: value.target.value});
        };

        return(
            <div>
                <Input
                    {...input}
                    type='select'
                    value={input.value}
                    onChange={(value) => handleChange(value)}
                    onBlur={() => input.onBlur()}
                >
                    {probability.map((risk, index) => {
                        return(
                            <option value={probability[index].value}>{probability[index].label}</option>
                        )
                    })}
                </Input>
            </div>
        )
    };

    RenderConsequenceSelect = ({input}) => {
        const handleChange = (value) => {
            input.onChange(value);
            this.setState({consequence: value.target.value});
        };

        return(
            <div>
                <Input
                    {...input}
                    type='select'
                    value={input.value}
                    onChange={(value) => handleChange(value)}
                    onBlur={() => input.onBlur()}
                >
                    {consequences.map((risk, index) => {
                        return(
                            <option value={consequences[index].value}>{consequences[index].label}</option>
                        )
                    })}
                </Input>
            </div>
        )
    };


    render() {
        const { handleSubmit, reset } = this.props;
        return (
            <Form onSubmit={handleSubmit(this.props.editRisk)}>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">
                            Edytuj ryzyko
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Rodzaj ryzyka</Label>
                                    <Field name="kind" component={this.RenderKindSelect} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Typ ryzyka</Label>
                                    <Field name="type" component={this.RenderTypeSelect} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Prawdopodobieństwo</Label>
                                    <Field name="probability" component={this.RenderProbabilitySelect} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Wpływ</Label>
                                    <Field name="consequence" component={this.RenderConsequenceSelect} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Istotność</Label>
                                    <p>
                                        {significanceValue.map(x => {
                                            if(this.state.consequence * this.state.probability === x.value){
                                                return <Badge color={x.color}>{x.label}</Badge>
                                            }
                                        })}
                                    </p>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="description">Opis</Label>
                            <Field name="description" type="textarea" component={this.RenderField} label="Opisz Ryzyko, charakterystyka ryzyka"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="prevSupp">Działania zapobiegawcze / wspomagające</Label>
                            <Field name="prevSupp" type="textarea" rows="4" component={this.RenderField} label="Opisz działania zapobiegawcze lub wspomagające"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="corrective">Działania naprawcze</Label>
                            <Field name="corrective" type="textarea" rows="4" component={this.RenderField} label="Opisz działania naprawcze"/>
                        </FormGroup>

                        <div className="mb-3">
                            <Button type="submit" color="primary" className="mr-1 mb-1">Zapisz</Button>
                            <Button color="danger" className="mr-1 mb-1" onClick={reset}>Anuluj</Button>
                        </div>
                    </CardBody>
                </Card>

            </Form>
        );
    }
}


const mapStateToProps = (state) => {
    return({
        initialValues: state.riskData,
        probability: state.riskData.probability,
        consequence: state.riskData.consequence
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getRisk: () => dispatch(getRisk(ownProps.riskID)),
    editRisk: (risk) => dispatch(editRisk(risk))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditRiskForm',
    enableReinitialize: true
})(EditRiskForm));