import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Form, FormGroup} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const {SearchBar, ClearSearchButton } = Search;

const initialProjects = [
    {
        status: 1,
        idProject: 1,
        nameProject: "Projekt jeden",
        startDate: "2019-03-10",
        endDate: "2019-06-15",
        projectManager: "Kamil Olszewski"
    },
    {
        status: 2,
        idProject: 2,
        nameProject: "Projekt dwa",
        startDate: "2019-01-05",
        endDate: "2019-03-12",
        projectManager: "Barbara Walczak"
    },
    {
        status: 2,
        idProject: 3,
        nameProject: "Projekt trzy",
        startDate: "2018-11-08",
        endDate: "2019-02-13",
        projectManager: "Kamil Olszewski"
    }
];

const tableColumns = [
    {
        dataField: "idProject",
        text: "Id",
        sort: true,
        headerStyle: () => {
            return { width: "5%" };
        }
    },
    {
        dataField: "nameProject",
        text: "Nazwa projektu",
        sort: true,
        headerStyle: () => {
            return { width: "60%" };
        }
    },
    {
        dataField: "startDate",
        text: "Data rozpoczęcia",
        sort: true,
        headerStyle: () => {
            return { width: "10%" };
        }
    },
    {
        dataField: "endDate",
        text: "Data zakończenia",
        sort: true,
        headerStyle: () => {
            return { width: "10%" };
        }
    },
    {
        dataField: "projectManager",
        text: "Kierownik projektu",
        sort: true,
        headerStyle: () => {
            return { width: "15%" };
        }
    },
];

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [...initialProjects],
            status: props.status
        };
    }

    render() {

        const projectListArray = this.state.projects.filter(item => item.status === this.state.status);

        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle tag="h5" className="mb-0">
                            Lista projektów
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ToolkitProvider
                            keyField="idProject"
                            data={projectListArray}
                            columns={tableColumns}
                            search
                        >
                            {
                                props => (
                                    <div>
                                        <Form inline style={{paddingBottom: '10px'}}>
                                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                                <SearchBar { ...props.searchProps } placeholder="Wyszukaj" />
                                            </FormGroup>
                                            <ClearSearchButton { ...props.searchProps } className="btn-primary" text="Wyczyść"/>
                                        </Form>
                                        <BootstrapTable
                                            { ...props.baseProps }
                                            classes="table-responsive-lg"
                                            bootstrap4
                                            bordered={false}
                                            striped
                                            hover
                                            filter={ filterFactory() }
                                            pagination={paginationFactory({
                                                sizePerPage: 5,
                                                sizePerPageList: [5, 10, 25, 50]
                                            })}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </CardBody>
                </Card>
            </>
        );
    }
}


export default ProjectList;