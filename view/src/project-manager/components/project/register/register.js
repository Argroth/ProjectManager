import React from "react";
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardTitle, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";



const tableColumns = [
    {
        dataField: "idRegister",
        text: "Id",
        sort: true,
        headerStyle: () => {
            return { width: "4%" };
        }
    },
    {
        dataField: "subject",
        text: "Nazwa",
        sort: false,
        headerStyle: () => {
            return { width: "9%" };
        }
    },
    {
        dataField: "description",
        text: "Opis",
        sort: false,
        headerStyle: () => {
            return { width: "20%" };
        }
    },
    {
        dataField: "notifyingUser",
        text: "Zgłaszający",
        sort: true,
        headerStyle: () => {
            return { width: "9" };
        }
    },
    {
        dataField: "dateOfApplication",
        text: "Data zgłoszenia",
        sort: true,
        headerStyle: () => {
            return { width: "9%" };
        }
    },
    {
        dataField: "impact",
        text: "Wpływ na projekt",
        sort: true,
        headerStyle: () => {
            return { width: "9%" };
        },
        formatter: (cell, row) => {
            return (
                <Badge color={row.impactColor}>{cell}</Badge>
            );
        },
    },
    {
        dataField: "correctiveActions",
        text: "Proponowane działania naprawcze / Wpływ na projekt (opis)",
        sort: false,
        headerStyle: () => {
            return { width: "20%" };
        }
    },
    {
        dataField: "decision",
        text: "Decyzja",
        sort: false,
        headerStyle: () => {
            return { width: "20%" };
        }
    }
];

const Register = (props) => {

    const register = props.register.map(item => item);

    return (
        <Card>
            <CardHeader>
                <div className="card-actions float-right">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="a">
                            Decyzja
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>Brak działań</DropdownItem>
                            <DropdownItem>Uzupełnij</DropdownItem>
                            <DropdownItem>Zmiana decyzji</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <CardTitle tag="h5" className="mb-0">
                    Rejestr problemów / zmian
                </CardTitle>
            </CardHeader>
            <CardBody>
                <BootstrapTable
                    bootstrap4
                    bordered={false}
                    keyField="idRegister"
                    data={register}
                    columns={tableColumns}
                    striped
                    hover
                    condensed
                    pagination={paginationFactory({
                        sizePerPage: 5,
                        sizePerPageList: [5, 10, 25, 50]
                    })}
                />
            </CardBody>
        </Card>
    );
};

export default Register