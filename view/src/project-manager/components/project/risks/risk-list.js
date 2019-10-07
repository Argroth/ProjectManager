import React from "react";
import {MinusCircle, PlusCircle,  Menu} from "react-feather";
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {toastr} from "react-redux-toastr";
import { connect } from 'react-redux';
import moment from 'moment';
import cellEditFactory from 'react-bootstrap-table2-editor';

import { markRiskAsOccurred, riskToEdit, decisionRisk } from "../../../../actions/project-manager-actions";


class ListOfRisk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: []
        };
        this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState({selected: [...this.state.selected, row._id]});
        } else {
            this.setState({selected: this.state.selected.filter(x => x !== row._id)});
        }
    };

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(row => row._id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    };

    editRisk(){
      if(this.state.selected.length === 1){
         this.props.riskToEdit(this.state.selected);
      }
    };

    markAsOccurred () {
        this.props.markRiskAsOccurred(this.state.selected);
        this.setState({selected: []})
    }

    render() {

        const tableColumns = [
            {
                dataField: "_id",
                text: "Id",
                sort: true,
                headerStyle: () => {
                    return {width: "4%"};
                }
            },
            {
                dataField: "kind",
                text: "Rodzaj ryzyka",
                sort: true,
                headerStyle: () => {
                    return {width: "9%"};
                }

            },
            {
                dataField: "type",
                text: "Typ ryzyka",
                sort: true,
                formatter: (cell, row) => {
                   return <Badge color={row.typeColor}>{row.typeLabel}</Badge>
                },
                headerStyle: () => {
                    return {width: "9%"};
                },
            },
            {
                dataField: "significance",
                text: "Istotność",
                sort: true,
                formatter: (cell, row) => {
                    return <Badge color={row.significanceColor}>{row.significanceLabel}</Badge>
                },
                headerStyle: () => {
                    return {width: "9%"};
                }
            },
            {
                dataField: "description",
                text: "Opis",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            },
            {
                dataField: "prevSupp",
                text: "Działania zapobiegawcze / wspomagające",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            },
            {
                dataField: "corrective",
                text: "Działania naprawcze",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            }
        ];

        const tableColumnsOccurred = [
            {
                dataField: "_id",
                text: "Id",
                sort: true,
                headerStyle: () => {
                    return {width: "4%"};
                }
            },
            {
                dataField: "kind",
                text: "Rodzaj ryzyka",
                sort: true,
                headerStyle: () => {
                    return {width: "9%"};
                }

            },
            {
                dataField: "type",
                text: "Typ ryzyka",
                sort: true,
                formatter: (cell, row) => {
                   return <Badge color={row.typeColor}>{row.typeLabel}</Badge>
                },
                headerStyle: () => {
                    return {width: "9%"};
                },
            },
            {
                dataField: "significance",
                text: "Istotność",
                sort: true,
                formatter: (cell, row) => {
                    return <Badge color={row.significanceColor}>{row.significanceLabel}</Badge>
                },
                headerStyle: () => {
                    return {width: "9%"};
                }
            },
            {
                dataField: "description",
                text: "Opis",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            },
            {
                dataField: "prevSupp",
                text: "Działania zapobiegawcze / wspomagające",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            },
            {
                dataField: "corrective",
                text: "Działania naprawcze",
                sort: false,
                headerStyle: () => {
                    return {width: "21%"};
                }
            },
            {
                dataField: "decision",
                text: "Decyzja",
                type: 'input',
                sort: false,
                headerStyle: () => {
                    return {width: "15%"};
                }
            }
        ];

        const expandRow = {
            renderer: row => (
                <div>
                    <p>{`Utworzone przez: ${row.createdBy}`}</p>
                    <p>{`Data utworzenia: ${row.createdAt}`}</p>
                    <p>{`Prawdopodobieństwo: ${row.probability}`}</p>
                    <p>{`Wpływ: ${row.consequence}`}</p>
                </div>
            ),
            showExpandColumn: true,
            expandByColumnOnly: true,
            expandHeaderColumnRenderer: ({isAnyExpands}) =>
                isAnyExpands? <MinusCircle width={14} height={16}/> : <PlusCircle width={16} height={16}/>,
            expandColumnRenderer: ({expanded}) =>
                expanded? <MinusCircle width={16} height={16}/> : <PlusCircle width={16} height={16}/>
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            style: {backgroundColor: '#B0DBFF'},
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };



        if(this.props.loading === true){
            return (
                <div>Loading ...</div>
            )
        }else {
            return (
                <>
                    {
                        (this.props.notOccurred.length !== 0) ? (
                            <Card>
                                <CardHeader>
                                    <div className="card-actions float-right">
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="a">
                                                <Menu/>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem onClick={() => this.editRisk()}>Edytuj</DropdownItem>
                                                <DropdownItem onClick={() => this.markAsOccurred()}>Oznacz jako wystąpiło</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <CardTitle tag="h5" className="mb-0">
                                        Lista ryzyk: <Badge
                                        color="secondary"> {this.props.notOccurred.length}  </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable
                                        bootstrap4
                                        bordered={false}
                                        keyField="_id"
                                        data={this.props.notOccurred}
                                        columns={tableColumns}
                                        selectRow={selectRow}
                                        expandRow={expandRow}
                                        cellEdit={ cellEditFactory({ mode: 'click' }) }
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
                        ) : null
                    }
                    {
                        (this.props.occurred.length !== 0) ? (
                            <Card>
                                <CardHeader>
                                    <div className="card-actions float-right">
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="a">
                                                Decyzja
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem onClick={() => this.props.decisionRisk('Brak dzialan', this.state.selected)}>Brak Działań</DropdownItem>
                                                <DropdownItem onClick={() => this.props.decisionRisk("Uzupełnij", this.state.selected)}>Uzupełnij</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <CardTitle tag="h5" className="mb-0">
                                        Lista ryzyk, które wystąpiły {<Badge
                                        color="secondary"> {this.props.occurred.length} </Badge>}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable
                                        bootstrap4
                                        bordered={false}
                                        keyField="_id"
                                        data={this.props.occurred}
                                        columns={tableColumnsOccurred}
                                        selectRow={selectRow}
                                        expandRow={expandRow}
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
                        ) : null
                    }
                </>
            );
        }
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
   markRiskAsOccurred: (risk) => dispatch(markRiskAsOccurred(risk)),
   riskToEdit: (risk) => dispatch(riskToEdit(risk)),
   decisionRisk: (decision, risks) => dispatch(decisionRisk(decision, risks))
});

const mapStateToProps = (state) => {
    if(!state.riskList.notOccurred){
        return({
            loading: true,
            occurred: '',
            notOccurred: ''
        })
    }else{
        state.riskList.occurred.forEach(project => {project.createdAt = moment(project.createdAt).format('YYYY-MM-DD')});
        state.riskList.notOccurred.forEach(project => {project.createdAt = moment(project.createdAt).format('YYYY-MM-DD')});
        return({
            occurred: state.riskList.occurred,
            notOccurred: state.riskList.notOccurred
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfRisk);
