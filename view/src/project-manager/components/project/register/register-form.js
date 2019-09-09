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

const impactOnProject = [
    {value: "1", label: "Niski", color: "primary"},
    {value: "2", label: "Średni", color: "warning"},
    {value: "3", label: "Wysokie", color: "danger"}
]


const RegisterForm  = ({submitRegister, state}) => (
    <Card>
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                Nowy problem / zmiana
            </CardTitle>
        </CardHeader>
        <CardBody>
            <Form onSubmit={submitRegister} >
                <Row form>
                    <Col md={10}>
                        <FormGroup>
                            <Label for="noteSubject">Nazwa</Label>
                            <Input type="text" name="noteSubject" id="noteSubject" placeholder="Nazwa" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label>Wpływ na projekt</Label>
                            <Input
                                type="select"
                                id="impactOnProject"
                                name="impactOnProject"
                                className="react-select-container"
                                classNamePrefix="react-select"
                            >
                                <option value="">Wybierz z listy</option>
                                <option value={impactOnProject[0].value}>{impactOnProject[0].label}</option>
                                <option value={impactOnProject[1].value}>{impactOnProject[1].label}</option>
                                <option value={impactOnProject[2].value}>{impactOnProject[2].label}</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="noteDescription">Opis</Label>
                    <Input type="textarea" rows="3" name="noteDescription" id="noteDescription" placeholder="Opis" />
                </FormGroup>
                <FormGroup>
                    <Label for="projectReasons">Proponowane działania naprawcze</Label>
                    <Input type="textarea" rows="3" name="correctiveActions" id="correctiveActions" placeholder="Opisz działania naprawcze" />
                </FormGroup>
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
            </Form>
        </CardBody>
    </Card>
);

export default RegisterForm;