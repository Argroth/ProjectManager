import React, {Component} from 'react';
import {Field, FieldArray, reduxForm} from "redux-form";
import { connect } from "react-redux";
import { createProject } from "../actions";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Form,
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
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";

const optionsTeam = [
    { value: "barbara walczak", label: "Barbara Walczak" },
    { value: "monika radzinska", label: "Monika Radzińska" },
    { value: "piotr matkowski", label: "Piotr Matkowski" },
    { value: "malwina janik", label: "Malwina Janik" },
    { value: "kamil olszewski", label: "Kamil Olszewski" },
    { value: "martyna kuleszewicz", label: "Martyna Kuleszewicz" }
];

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
    };


    render() {
        const {handleSubmit, submitting, } = this.props;
            // return (
            //     <div>
            //         <span>{this.props.message? <h1>{this.props.message}</h1> : null}</span>
            //         <Card>
            //         <form onSubmit={handleSubmit(this.props.createNewProject)}>
            //             <Field name="projectName" type="text" component={renderField} label="Project Name"/>
            //             <Field name="projectGoal" type="text" component={renderField} label="Project Goal"/>
            //             <Field name="projectScope" type="text" component={renderField} label="Project Scope"/>
            //             <Field name="projectReasons" type="text" component={renderField} label="Project Reasons"/>
            //             <FieldArray name="projectBenefits" component={renderBenefits}/>
            //             <Field name="projectStartDate" type="date" component={renderField} label="Project Start Date"/>
            //             <Field name="projectEndDate" type="date" component={renderField} label="Project End Date"/>
            //             <Field name="projectBudget" type="number" component={renderField} label="Project Budget"/>
            //             <Field name="currency" component="select">
            //                 <option></option>
            //                 <option value="PLN">Zł</option>
            //                 <option value="Euro">Euro</option>
            //             </Field>
            //             <Field name="projectManager" type="text" component={renderField} label="Project Manager"/>
            //             <FieldArray name="projectSteeringComitee" component={renderMembersOfSteeringComitee}/>
            //             <FieldArray name="projectTeam" component={renderTeams}/>
            //             <FieldArray name="projectStage" component={renderStages}/>
            //             <FieldArray name="projectKPI" component={renderKPIs}/>
            //             <Field name="projectRisk" type="text" component={renderField} label="Project Risk"/>
            //             <Field name="projectOrganization" type="text" component={renderField} label="Project Organization"/>
            //             <div>
            //                 <button type="submit" disabled={submitting}>Submit</button>
            //             </div>
            //         </form>
            //         </Card>
            //     </div>
            //  );
        return(
            <div>
                <form onSubmit={handleSubmit(this.props.createNewProject)}>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h5" className="mb-0">
                                Karta projektu
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Informacje podstawowe
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row form>
                                        <Col md={8}>
                                            <FormGroup>
                                                <Label for="projectName">Nazwa projektu</Label>
                                                <Field name="projectName" type="text" component={renderField} label="Project Name"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="startdate">Termin rozpoczęcia</Label>
                                                <Input
                                                    type="date"
                                                    name="startdate"
                                                    id="startdate"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="endDate">Termin zakończenia</Label>
                                                <Input
                                                    type="date"
                                                    name="endDate"
                                                    id="endDate"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="projectGoal">Cel główny</Label>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            name="projectGoal"
                                            id="projectGoal"
                                            placeholder="Wskazanie głównego celu/ów realizacji projektu zgodnego z zasadą SMART" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectScope">Zakres projektu</Label>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            name="projectScope"
                                            id="projectScope"
                                            placeholder="Wskazanie zakresu projektu (co wchodzi a co nie wchodzi w zakres projektu: in/out)" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectReasons">Przyczyny uruchomienia projektu</Label>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            name="projectReasons"
                                            id="projectReasons"
                                            placeholder="Krótki opis sytuacji wyjściowej, dlaczego uruchamiamy projekt" />
                                    </FormGroup>
                                    <Row>
                                        <Col md={4} sm={12}>
                                            <FormGroup>
                                                <Label>Kierownik projektu</Label>
                                                <Select
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    options={optionsTeam}
                                                    isSearchable
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} sm={12}>
                                            <FormGroup>
                                                <Label>Właściciel projektu / komitet sterujący</Label>
                                                <Select
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    options={optionsTeam}
                                                    isSearchable
                                                    isMulti
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2} sm={12}>
                                            <FormGroup>
                                                <Label>Waluta projektu</Label>
                                                <Select
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    options={optionsCurrency}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Korzyści z projektu
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="projectBenefit">Korzyść</Label>
                                                <InputGroup>
                                                    <Input
                                                        type="text"
                                                        name="projectBenefit"
                                                        id="projectBenefit"
                                                        placeholder="Kluczowe korzyści osiągnięte w wyniku zrealizowanego projektu"
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText>
                                                            <Input
                                                                addon
                                                                type="checkbox"
                                                                aria-label="Korzyść mierzalna"
                                                                checked
                                                            />
                                                        </InputGroupText>
                                                        <InputGroupText>Korzyść mierzalna</InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>

                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="projectKPI">KPI</Label>
                                                <Input
                                                    type="text"
                                                    name="projectKPI"
                                                    id="projectKPI"
                                                    placeholder="KPI" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="kpiValue">Wartość docelowa miernika</Label>
                                                <Input
                                                    type="text"
                                                    name="kpiValue"
                                                    id="kpiValue"
                                                    placeholder="Wartość docelowa miernika"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <InputGroup>
                                                    <Input
                                                        type="text"
                                                        name="projectBenefit"
                                                        id="projectBenefit"
                                                        placeholder="Kluczowe korzyści osiągnięte w wyniku zrealizowanego projektu"
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <InputGroupText>
                                                            <Input
                                                                addon
                                                                type="checkbox"
                                                                aria-label="Korzyść mierzalna"
                                                            />
                                                        </InputGroupText>
                                                        <InputGroupText>Korzyść mierzalna</InputGroupText>
                                                    </InputGroupAddon>
                                                </InputGroup>

                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>

                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <PlusCircle className="align-baseline" size={24} />
                                </CardBody>
                            </Card>

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
                                                <Select
                                                    className="react-select-container"
                                                    classNamePrefix="react-select"
                                                    options={optionsTeam}
                                                    isSearchable
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={8} sm={12}>
                                            <Table className="mb-0">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Imię i nazwisko</th>
                                                    <th>Firma</th>
                                                    <th>Email</th>
                                                    <th>Telefon</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={avatar1}
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle my-n1"
                                                            alt="Avatar"
                                                        />
                                                    </td>
                                                    <td>Kamil Olszewski</td>
                                                    <td>Teleskop</td>
                                                    <td>kamil.olszewski@telemond-holding.com</td>
                                                    <td>+48 666 777 888</td>
                                                    <td>
                                                        <Trash className="align-middle" size={18} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={avatar3}
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle my-n1"
                                                            alt="Avatar"
                                                        />
                                                    </td>
                                                    <td>Barbara Walczak</td>
                                                    <td>Teleskop</td>
                                                    <td>barbara.walczak@telemond-holding.com</td>
                                                    <td>+48 666 777 888</td>
                                                    <td>
                                                        <Trash className="align-middle" size={18} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={avatar4}
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle my-n1"
                                                            alt="Avatar"
                                                        />
                                                    </td>
                                                    <td>Monika Radzińska</td>
                                                    <td>Teleskop</td>
                                                    <td>monika.radzińska@telemond-holding.com</td>
                                                    <td>+48 666 777 888</td>
                                                    <td>
                                                        <Trash className="align-middle" size={18} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={avatar2}
                                                            width="32"
                                                            height="32"
                                                            className="rounded-circle my-n1"
                                                            alt="Avatar"
                                                        />
                                                    </td>
                                                    <td>Piotr Matkowski</td>
                                                    <td>Montel</td>
                                                    <td>piotr.matkowski@telemond-holding.com</td>
                                                    <td>+48 666 777 888</td>
                                                    <td>
                                                        <Trash className="align-middle" size={18} />
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>

                            <Card>
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
                                                <Input
                                                    type="text"
                                                    name="projectStage"
                                                    id="projectStage"
                                                    placeholder="Etap projektu" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="stageBudget">Budżet</Label>
                                                <InputGroup className="mb-3">
                                                    <Input
                                                        type="text"
                                                        name="stageBudget"
                                                        id="stageBudget"
                                                        placeholder="Budżet etapu"
                                                        value="12 000"
                                                    />
                                                    <InputGroupAddon addonType="append">PLN</InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="stageResults">Rezultat etapu</Label>
                                                <Input
                                                    type="text"
                                                    name="stageResults"
                                                    id="stageResults"
                                                    placeholder="Rezultaty/produkty które powinny być efektem etapu projektowego"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="projectStage"
                                                    id="projectStage"
                                                    placeholder="Etap projektu" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <InputGroup className="mb-3">
                                                    <Input
                                                        type="text"
                                                        name="stageBudget"
                                                        id="stageBudget"
                                                        placeholder="Budżet etapu"
                                                        value="40 000"
                                                    />
                                                    <InputGroupAddon addonType="append">PLN</InputGroupAddon>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    name="stageResults"
                                                    id="stageResults"
                                                    placeholder="Rezultaty/produkty które powinny być efektem etapu projektowego"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <PlusCircle className="align-baseline" size={24} />
                                    <div className="mb-4">
                                        <br />
                                        <h4>Budżet projektu: 52 000 PLN</h4>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Kluczowe ryzyka projektu
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label for="projectRisks">Ryzyka</Label>
                                        <Input
                                            type="text"
                                            name="projectRisks"
                                            id="projectRisks"
                                            placeholder="Wskazanie kluczowych i najważniejszych zagrożeń dla projektu" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            name="projectRisks"
                                            id="projectRisks"
                                            placeholder="Wskazanie kluczowych i najważniejszych zagrożeń dla projektu" />
                                    </FormGroup>
                                    <PlusCircle className="align-baseline" size={24} />
                                </CardBody>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5" className="mb-0">
                                        Organizacja projektu
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label for="projectMeetings">Spotkania zespołu</Label>
                                        <Input
                                            type="text"
                                            name="projectMeetings"
                                            id="projectMeetings"
                                            placeholder="Opisanie typów spotkań i ich częstotliwości" />
                                    </FormGroup>
                                    <PlusCircle className="align-baseline" size={24} />
                                    <FormGroup>
                                        <Label>Bieżącza komunikaja projektowa</Label>
                                        <Select
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                            options={optionsOrganization}
                                            isMulti
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectOrganization">Opisanie pozostałych kwestii organizacyjnych</Label>
                                        <Input
                                            type="textarea"
                                            rows="3"
                                            name="projectOrganization"
                                            id="projectOrganization"
                                            placeholder="Opisanie pozostałych kwestii organizacyjnych" />
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

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <Input {...input} placeholder={label} type={type}/>
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