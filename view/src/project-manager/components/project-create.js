import React, {Component} from 'react';
import {Field, FieldArray, reduxForm} from "redux-form";
import { connect } from "react-redux";
import { createProject, getAllUsers } from "../../actions/project-manager-actions";
import _ from 'lodash';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
    Table,
} from "reactstrap";

import { PlusCircle, Trash } from "react-feather";
import Select from "react-select";


const optionsOrganization = [
    { value: "telefon", label: "Telefon" },
    { value: "teams", label: "Teams" },
    { value: "spotkanie", label: "Spotkanie" },
    { value: "outlook", label: "Outlook" },
    { value: "skype", label: "Skype" }
];

const optionsCurrency =[
    {value: "PLN", label: "PLN"},
    {value: "EUR", label: "EUR"}
];

class ProjectCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
            currency: "PLN",
            benefits: [],
            projectTeam: [],
            projectBudgetArray: [],
            projectBudget: 0,
            PL: {
                projectCard: 'Karta Projektu',
                info: 'Informacje',
                projectName: 'Nazwa Projektu',
                startDate: 'Data Rozpoczęcia',
                endDate: 'Data Zakończenia',
            },
            EN: {
                projectCard: 'Project Card',
                info: 'Basic Informations',
                projectName: 'Project Name',
                startDate: 'Start Date',
                endDate: 'End Date',
            },
            textToShow: {name: '22'}
        }
    };

    componentDidMount() {
        this.props.getTeam();
        this.props.language === 'PL'? this.setState({textToShow: this.state.PL}) : this.setState({textToShow: this.state.EN});
    }


    render() {
        const {handleSubmit, submitting, reset} = this.props;

        const RenderField = ({ input, label, type, meta: { touched, error } }) => (
            <div>
                <Input {...input} type={type} placeholder={label}/>
                {touched && error && <span>{error}</span>}
            </div>
        );

        const RenderSelectCurrency = ({input}) => {
            const handleCurrencyChange = (value) => {
                input.onChange(value);
                this.setState({currency: value.value});
            };


            return(
                <div>
                    <Select
                        {...input}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        value={input.value}
                        onChange={(value) => handleCurrencyChange(value)}
                        onBlur={() => input.onBlur()}
                        options={optionsCurrency}
                    />
                </div>
            )
        };

        const RenderSelect = ({input}) => {
            return(
                <div>
                    <Select
                        {...input}
                        id="projectManager"
                        name="projectManager"
                        options={this.props.userList}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                    />
                </div>
            )
        };

        const RenderSelectMulti = ({input}) => {
            return(
                <div>
                    <Select
                        {...input}
                        id="projectSteeringComitee"
                        name="projectSteeringComitee"
                        options={this.props.userList}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                        isMulti
                    />
                </div>
            )
        };

        const RenderKPIs = ({ fields }) => (
            <div>
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <input type="checkbox" onChange={(event) => {
                            event.target.checked === true? fields.push() : fields.remove(0)
                        }}/>
                    </InputGroupText>
                    <InputGroupText>Korzyść mierzalna</InputGroupText>
                </InputGroupAddon>

                    {fields.map((kpi, index) => (
                            <InputGroup key={index}>
                            <FormGroup>
                                <Label for="projectKPI">KPI</Label>
                                <Field
                                    name={`${kpi}.kpi`}
                                    type="text"
                                    component={RenderField}
                                    label="KPI"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="kpiValue">Wartość docelowa miernika</Label>
                                <Field
                                    name={`${kpi}.value`}
                                    type="text"
                                    component={RenderField}
                                    label="KPI Value"
                                />
                            </FormGroup>
                            </InputGroup>
                ))}
            </div>
        );


        const RenderBenefits = ({ fields }) => (
            <Card>
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0">
                        Korzyści z projektu
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Row form inline>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="projectBenefit">Korzyść</Label>
                                <Row inline>
                                    {fields.map((benefit, index) => (
                                        <InputGroup key={index}>
                                             <Trash className="align-middle" size={25} onClick={() => fields.remove(index)}/>
                                                    <Field
                                                        name={`${benefit}.benefit`}
                                                        type="text"
                                                        component={RenderField}
                                                        label="cośtam korzyść"
                                                    />
                                            <FieldArray name={`${benefit}.kpi`} component={RenderKPIs} />

                                        </InputGroup>

                                    ))}
                                    </Row>
                            </FormGroup>
                            <PlusCircle className="align-baseline" size={24} onClick={() => fields.push({})}/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );

        const RenderSelectTeam = ({input}) => {

            const handleChange = (value) => {
                    input.onChange(value);
                    if(_.find(this.state.projectTeam, {"value": value}) === undefined){
                        this.setState({projectTeam:[value]})
                    } else {
                        const newArray = _.remove(this.state.projectTeam, (x) => {
                            return x.value !== value;
                        });
                        this.setState({projectTeam: newArray});
                    }
            };

            return(
                <div>
                    <Select
                        {...input}
                        id="projectTeam"
                        name="projectTeam"
                        options={this.props.userList}
                        value={input.value}
                        onChange={(value) => handleChange(value)}
                        onBlur={() => input.onBlur()}
                        isMulti
                    />
                </div>
            )
        };


        const RenderStages = ({ fields }) => {
            const handleClick = () => {
              fields.push();
              this.setState({projectBudgetArray: [...this.state.projectBudgetArray, {value: 0}]});
            };


            return(
                <div>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">
                            Etapy i rezultaty projektu
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row form>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="projectStage">Etap</Label>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="stageBudget">Budżet</Label>
                                </FormGroup>
                            </Col>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="stageResults">Rezultat etapu</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        {fields.map((stage, index, input) => {
                            const handleChange = (event) => {
                                const newArray = this.state.projectBudgetArray;

                                event.target.value > 0 ? newArray[index] = {value: event.target.value} : newArray[index] = {value: 0};
                                let sum = 0;

                                newArray.map(item => {
                                    sum = sum + parseInt(item.value);
                                });

                                this.setState({projectBudget: sum});
                            };

                            return(
                                <Row form key={index}>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Field
                                                name={`${stage}.name`}
                                                type="text"
                                                component={RenderField}
                                                label="Etap projektu"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <InputGroup className="mb-3">
                                                <Field
                                                    name={`${stage}.budget`}
                                                    type="text"
                                                    component={RenderField}
                                                    value={input.value}
                                                    onBlur={(event) => handleChange(event)}
                                                    label="Budżet etapu"
                                                />
                                                <InputGroupAddon addonType="append">{this.state.currency}</InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Field
                                                name={`${stage}.result`}
                                                type="text"
                                                component={RenderField}
                                                label="Rezultaty/produkty które powinny być efektem etapu projektowego"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            )
                        })}
                        <PlusCircle className="align-baseline" size={24} onClick={() => handleClick()}/>
                        <div className="mb-4">
                            <br />
                            <h4>Budżet projektu: {this.state.projectBudget} {this.state.currency}</h4>
                        </div>
                    </CardBody>
                </div>

            )
        };

        const RenderRisks = ({ fields }) => (
            <Card>
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0">
                        Kluczowe ryzyka projektu
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for="projectRisks">Ryzyka</Label>
                        {fields.map((risk, index) => (
                            <Row key={index}>
                                <Col md={12}>
                                <Field
                                    type="text"
                                    name={`${risk}.name`}
                                    id="projectRisks"
                                    component={RenderField}
                                    label="Wskazanie kluczowych i najważniejszych zagrożeń dla projektu" />
                                    <br />
                                </Col>
                            </Row>
                        ))}
                    </FormGroup>
                    <PlusCircle className="align-baseline" size={24} onClick={() => fields.push()}/>
                </CardBody>
            </Card>
        );

        const RenderMeetings = ({ fields }) => (
            <div>
                {fields.map((option, index) => (
                    <div key={index}>
                        <Field
                            type="text"
                            name={`${option}.name`}
                            id="projectMeetings"
                            component={RenderField}
                            label="Opisanie typów spotkań i ich częstotliwości" />
                        <br/>
                    </div>

            ))}
                <PlusCircle className="align-baseline" size={24} onClick={() => fields.push()}/>
            </div>
    );

        const RenderCommunication = ({input}) => {
            return(
                <div>
                    <Select
                        {...input}
                        id="projectCommunication"
                        name="projectCommunication"
                        options={optionsOrganization}
                        value={input.value}
                        onChange={(value) => input.onChange(value)}
                        onBlur={() => input.onBlur()}
                        isMulti
                    />
                </div>
            )
        };


        return(
            <div>
                <form onSubmit={handleSubmit(this.props.createNewProject)}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h5" className="mb-0">
                                {this.state.textToShow.projectCard}
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        {this.state.textToShow.info}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row form>
                                        <Col md={8}>
                                            <FormGroup>
                                                <Label for="projectName">{this.state.textToShow.projectName}</Label>
                                                <Field name="projectName" type="text" component={RenderField} label={this.state.textToShow.projectName}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="startdate">{this.state.textToShow.startDate}</Label>
                                                <Field name="projectStartDate" type="date" component={RenderField} label={this.state.textToShow.startDate}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="endDate">{this.state.textToShow.endDate}</Label>
                                                <Field name="projectEndDate" type="date" component={RenderField} label={this.state.textToShow.endDate}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="projectGoal">Cel główny</Label>
                                        <Field name="projectGoal" type="textarea" rows="4" component={RenderField} label="Wskazanie głównego celu/ów realizacji projektu zgodnego z zasadą SMART"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectScope">Zakres projektu</Label>
                                        <Field name="projectScope" type="textarea" rows="4" component={RenderField} label="Wskazanie zakresu projektu (co wchodzi a co nie wchodzi w zakres projektu: in/out)"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectReasons">Przyczyny uruchomienia projektu</Label>
                                        <Field name="projectReasons" type="textarea" rows="4" component={RenderField} label="Krótki opis sytuacji wyjściowej, dlaczego uruchamiamy projekt"/>
                                    </FormGroup>
                                    <Row>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label>Kierownik projektu</Label>
                                                <Field name="projectManager"  component={RenderSelect}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <FormGroup>
                                                <Label>Właściciel projektu / komitet sterujący</Label>
                                                <Field name="projectSteeringComitee"  component={RenderSelectMulti}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2} sm={12}>
                                            <FormGroup>
                                                <Label>Waluta projektu</Label>
                                                <Field name="projectCurrency"  component={RenderSelectCurrency}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <FieldArray name="projectBenefits" component={RenderBenefits}/>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Zespół projektowy
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Field name="projectTeam"  component={RenderSelectTeam}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={8} sm={12}>
                                            <Table className="mb-0">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Imię i nazwisko</th>
                                                    <th>Firma</th>
                                                    <th>Dział</th>
                                                    <th>Stanowisko</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.projectTeam.map((array, index) => {
                                                    if(array !== null){
                                                        return(
                                                            array.map((member, index) => {
                                                                return(
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <img
                                                                                src={'avatar'}
                                                                                width="32"
                                                                                height="32"
                                                                                className="rounded-circle my-n1"
                                                                                alt="Avatar"
                                                                            />
                                                                        </td>
                                                                        <td>{member.value}</td>
                                                                        <td>{member.meta.company}</td>
                                                                        <td>{member.meta.department}</td>
                                                                        <td>{member.meta.departmentRole}</td>
                                                                    </tr>
                                                                )
                                                            }))
                                                    }else{
                                                        return(
                                                            <tr key={index}>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        )
                                                    }
                                                })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
                              <FieldArray name="projectStages"  component={RenderStages}/>
                            </Card>

                            <FieldArray name="projectRisks" component={RenderRisks}/>


                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Organizacja projektu
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label for="projectMeetings">Spotkania zespołu</Label>
                                        <FieldArray name="projectMeetings" component={RenderMeetings}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Bieżącza komunikaja projektowa</Label>
                                        <Field name="projectCommunication"  component={RenderCommunication}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectOrganization">Opisanie pozostałych kwestii organizacyjnych</Label>
                                        <Field name="projectOrganization" type="textarea" rows="4" component={RenderField} label="Opisanie pozostałych kwestii organizacyjnych"/>
                                    </FormGroup>
                                </CardBody>
                            </Card>

                            <div className="mb-3">
                                <Button
                                    color="primary"
                                    className="mr-1 mb-1"
                                    type="submit"
                                >
                                    Zapisz
                                </Button>
                                <Button
                                    color="danger"
                                    className="mr-1 mb-1"
                                    onClick={reset}
                                >
                                    Anuluj
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </div>
        )

    }
}






const validate = values => {
    const errors = {};
    if (!values.projectName) {
        errors.projectName = 'Required'
    }
    if(values.projectEndDate < values.projectStartDate){
        errors.projectStartDate = 'Start date cannot be greater than end date';
        errors.projectEndDate = 'Start date cannot be greater than end date';
    }
     const projectStagesErrors = [];
     if(!values.projectStages){
     } else {
        values.projectStages.map((stage, index) => {
            const stageErrors = {};
            if(stage === undefined){
            } else {
                if(stage.budget < 0){
                    stageErrors.name = "Must be greater than 0";
                    projectStagesErrors[index] = stageErrors;
                }
            }
        });
        errors.stages = projectStagesErrors;
    }

    return errors
};

const mapStateToProps = (state, ownProps) => {
    return ({...ownProps,
        message: state.projectCreate.data,
        userList: state.userList,
        language: state.language,
       });

};

const mapDispatchToProps = (dispatch) => ({
        createNewProject: (values) => dispatch(createProject(values)),
        getTeam: () => dispatch(getAllUsers())
});

export default reduxForm({
    form: 'NewProjectForm',
    validate
})(
    connect(mapStateToProps, mapDispatchToProps)(ProjectCreate)
);
