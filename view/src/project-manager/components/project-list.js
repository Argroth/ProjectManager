import React from "react";
import {Card, CardBody, CardHeader, CardTitle, Form, FormGroup} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from 'react-redux';
import {getAllProjects} from "../../actions/project-manager-actions";
import { Redirect } from 'react-router-dom';
import moment from 'moment';


const {SearchBar, ClearSearchButton } = Search;

const tableColumns = [
    {
        dataField:'_id',
        text: "ID",
        sort: true,
        headerStyle: () => {
            return { width: "20%" };
        }
    },
    {
        dataField:'projectName',
        text: "Nazwa Projektu",
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


    doSomething = () => {
        const projectList = this.props.projectList;
        projectList.forEach(project => {
           project.projectStartDate = moment(project.projectStartDate).format('DD-MM-YYYY');
           project.projectEndDate = moment(project.projectEndDate).format('DD-MM-YYYY');
        });
    };


    render() {

        const projectListArray = this.props.projectList.filter(item => item.meta.status === this.state.status);

        const rowEvents = {
            onClick: (e, row ) => {
                this.setState({redirect: true, id: row._id});
            }
        };

        if(this.state.redirect){
            return(
                <Redirect to={'/project-manager/project-edit/'+ this.state.id}/>
            )
        }

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
                                            rowEvents={rowEvents}
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
        const list = state.projectsList.orderedProjectList;
        list.forEach(project => {project.projectStartDate = moment(project.projectStartDate).format('DD-MM-YYYY'); project.projectEndDate = moment(project.projectEndDate).format('DD-MM-YYYY')});

        return ({
            ...ownProps,
            projectList: state.projectsList.orderedProjectList,
            language: state.language
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);