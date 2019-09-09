import React from "react";
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


const kindOfRisk = [
    {value: "Zewnetrzne", label: "Zewnętrzne"},
    {value: "Organizacyjne", label: "Organizacyjne"},
    {value: "Techniczne", label: "Techniczne"},
    {value: "Związane z zarządzaniem", label: "Związane z zarządzaniem"}
];

const typeOfRisk = [
    {value: "Pozytywne", label: "Pozytywne", color:"success"},
    {value: "Negatywne", label: "Negatywne", color:"danger"}
];

const probabilityAndConsequences = [
    {value: "1", label: "Niskie"},
    {value: "2", label: "Średnie"},
    {value: "3", label: "Wysokie"}
];

const RiskForm = ({submitFn, changeProbability, changeConsequences, state}) => (

    <Form onSubmit={submitFn}>
        <Card>
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                    Nowe ryzyko
                </CardTitle>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Rodzaj ryzyka</Label>
                            <Input
                                type="select"
                                id="kindOfRisk"
                                name="kindOfRisk"
                                className="react-select-container"
                                classNamePrefix="react-select"
                            >
                                <option value="">Wybierz z listy</option>
                                {kindOfRisk.map((risk, index) => {
                                    return(
                                        <option value={kindOfRisk[index].value}>{kindOfRisk[index].label}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Typ ryzyka</Label>
                            <Input
                                type="select"
                                id="typeOfRisk"
                                name="typeOfRisk"
                                className="react-select-container"
                                classNamePrefix="react-select"
                            >
                                <option value="">Wybierz z listy</option>
                                {typeOfRisk.map((risk, index) => {
                                    return(
                                        <option value={typeOfRisk[index].value}>{typeOfRisk[index].label}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Prawdopodobieństwo</Label>
                            <Input
                                type="select"
                                id="probability"
                                name="probability"
                                className="react-select-container"
                                classNamePrefix="react-select"
                                onChange={changeProbability}
                            >
                                <option value="">Wybierz z listy</option>
                                {probabilityAndConsequences.map((risk, index) => {
                                    return(
                                        <option value={probabilityAndConsequences[index].value}>{probabilityAndConsequences[index].label}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Wpływ</Label>
                            <Input
                                type="select"
                                id="consequences"
                                name="consequences"
                                className="react-select-container"
                                classNamePrefix="react-select"
                                onChange={changeConsequences}
                            >
                                <option value="">Wybierz z listy</option>
                                {probabilityAndConsequences.map((risk, index) => {
                                    return(
                                        <option value={probabilityAndConsequences[index].value}>{probabilityAndConsequences[index].label}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Istotność</Label>
                            <p>
                                <Badge color={state.significanceColor}>
                                    {state.significance}
                                </Badge>
                            </p>
                        </FormGroup>
                    </Col>
                </Row>


                <FormGroup>
                    <Label for="projectGoal">Opis</Label>
                    <Input
                        type="textarea"
                        rows="3"
                        name="riskDescription"
                        id="riskDescription"
                        placeholder="Opisz ryzyko, charakterystyka ryzyka"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="projectScope">Działania zapobiegawcze / wspomagające</Label>
                    <Input
                        type="textarea"
                        rows="3"
                        name="preventiveOrSupportiveActions"
                        id="preventiveOrSupportiveActions"
                        placeholder="Opisz działania zapobiegawcze lub wspomagające"/>
                </FormGroup>
                <FormGroup>
                    <Label for="projectReasons">Działania naprawcze</Label>
                    <Input
                        type="textarea"
                        rows="3"
                        name="correctiveActions"
                        id="correctiveActions"
                        placeholder="Opisz działania naprawcze"/>
                </FormGroup>
                <div className="mb-3">
                    <Button
                        type="submit"
                        color="primary"
                        className="mr-1 mb-1"
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

    </Form>
);

export default RiskForm;