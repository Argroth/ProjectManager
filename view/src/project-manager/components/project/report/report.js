import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";

import RiskForm from "../risks/risk-form";
import RegisterForm from "../register/register-form"



const Report = ({submitRegister, changeTypeInformation, state, submitFn, changeProbability, changeConsequences }) => (

    <Card>
        <CardHeader>
            <CardTitle tag="h5" className="mb-0">
                Zgłoszenie
            </CardTitle>
        </CardHeader>
        <CardBody>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <Label>Rodzaj zgłaszenia</Label>
                        <Input
                            type="select"
                            id="typeInformation"
                            name="typeInformation"
                            className="mb-3"
                            onChange={changeTypeInformation}
                        >
                            <option value="">Wybierz z listy</option>
                            <option value="1">Ryzyko</option>
                            <option value="2">Zmiania / problem</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>

            {
                (state.valueTypeInformation === "1") ? (
                    <RiskForm
                        submitFn={submitFn}
                        changeProbability={changeProbability}
                        changeConsequences={changeConsequences}
                        state={state}
                    />
                ) : (
                    state.valueTypeInformation ==="2"
                ) ? (
                    <RegisterForm
                        submitRegister={submitRegister}
                        state={state}
                    />
                ) : null
            }

        </CardBody>
    </Card>
);

export default Report;