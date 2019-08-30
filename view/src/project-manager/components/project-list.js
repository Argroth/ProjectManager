import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Form, FormGroup} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from 'react-redux';
import {getAllProjects} from "../../actions/project-manager-actions";

const {SearchBar, ClearSearchButton } = Search;

const tableColumns = [
    {
        dataField:'projectName',
        text: "Nazwa",
        sort: true,
        headerStyle: () => {
            return { width: "50%" };
        }
    },
    {
        dataField: "projectStartDate",
        text: "Data rozpoczęcia",
        sort: true,
        headerStyle: () => {
            return { width: "15%" };
        }
    },
    {
        dataField: "projectEndDate",
        text: "Data zakończenia",
        sort: true,
        headerStyle: () => {
            return { width: "15%" };
        }
    },
    {
        dataField: 'projectManager',
        text: "Kierownik projektu",
        sort: true,
        headerStyle: () => {
            return { width: "20%" };
        }
    },
];

class ProjectList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: props.status
        };
    }


    componentDidMount() {
        this.props.getAllProjects();
    }


    render() {

        const projectListArray = this.props.projectList.filter(item => item.meta.status === this.state.status);

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

const mapDispatchToProps = (dispatch) => ({
    getAllProjects: () => dispatch(getAllProjects())
});

const mapStateToProps = (state, ownProps) => {
    if(!state.projectsList.orderedProjectList){
        return ({
            ...ownProps,
            projectList: []
        })
    }else {
        return ({
            ...ownProps,
            projectList: state.projectsList.orderedProjectList,
            language: state.language
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);