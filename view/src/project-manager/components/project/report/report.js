import React, {Component} from 'react';

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


class Report extends Component {
    constructor(props) {
        super(props);

        this.state={
            formToShow: ''
        }
    }

    changeFormShow = (event) =>{
        this.setState({formToShow: event.target.value})
};

    render() {
        return (
            <div>
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
                                        onChange={this.changeFormShow}
                                    >
                                        <option value="">Wybierz z listy</option>
                                        <option value="1">Ryzyko</option>
                                        <option value="2">Zmiania / problem</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        {
                            (this.state.formToShow === "1") ? (
                                <RiskForm projectID={this.props.projectID}/>
                            ) : (
                                this.state.formToShow ==="2"
                            ) ? (
                                <RegisterForm />
                            ) : null
                        }

                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Report;

