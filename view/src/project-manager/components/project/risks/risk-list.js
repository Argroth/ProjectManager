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


const typeOfRisk = [
    {value: "Pozytywne", label: "Pozytywne", color:"success"},
    {value: "Negatywne", label: "Negatywne", color:"danger"}
];

const significanceValue = [
    {value: 0, label: "", color:""},
    {value: 1, label: "Mała", color:"primary"},
    {value: 2, label: "Mała", color:"primary"},
    {value: 3, label: "Średnia", color:"warning"},
    {value: 4, label: "Średnia", color:"warning"},
    {value: 6, label: "Duża", color:"danger"},
    {value: 9, label: "Duża", color:"danger"}
];

const initialStateRisk = [
    {
        idRisk: 1,
        kindOfRisk: "Zewnętrzne",
        typeOfRisk: "Negatywne",
        riskDescription: "Brak dostawy, brak dostawy na czas, zła jakość",
        probability: "Średnie",
        consequences: "Średnie",
        significance: "Średnia",
        preventiveSupportiveActions: "Opracowanie procedury palenia wewnątrz. Kontroferty z innych firm",
        correctiveActions: "Dodanie wybiegów do nestingów lub wypalenie wybiegów na osobnych blachach",
        createDate: "2019-05-12",
        typeOfRiskColor: "danger",
        significanceColor: "warning",
        riskOccurred: false,
        decision: ""
    },
    {
        idRisk: 3,
        kindOfRisk: "Zewnętrzne",
        typeOfRisk: "Negatywne",
        riskDescription: "Norma spawalnicza się zmieni",
        probability: "Średnie",
        consequences: "Średnie",
        significance: "Średnia",
        preventiveSupportiveActions: "Opracowanie procedury palenia wewnątrz",
        correctiveActions: "Dodanie wybiegów do nestingów lub wypalenie wybiegów na osobnych blachach",
        createDate: "2019-05-18",
        typeOfRiskColor: "danger",
        significanceColor: "warning",
        riskOccurred: false,
        decision: ""
    }
];




class ListOfRisk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueProbability: "",
            valueConsequences: "",
            significance: "",
            items: [...initialStateRisk],
            selected: []
        };

        this.addRisk = this.addRisk.bind(this);
        this.handleChangeProbability = this.handleChangeProbability.bind(this);
        this.handleChangeConsequences = this.handleChangeConsequences.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.markAsOccurred = this.markAsOccurred.bind(this);

    }


    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row._id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row._id)
            }));
        }
    };

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
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

    handleChangeProbability (event) {
        this.setState({valueProbability: event.target.value});
        const significanceValueArray = significanceValue.filter(item => item.value === event.target.value * this.state.valueConsequences);
        this.setState({
            significance: significanceValueArray.map(item => item.label),
            significanceColor: significanceValueArray.map(item => item.color)
        });
    }

    handleChangeConsequences (event) {
        this.setState({valueConsequences: event.target.value});
        const significanceValueArray = significanceValue.filter(item => item.value === this.state.valueProbability * event.target.value);
        this.setState({
            significance: significanceValueArray.map(item => item.label),
            significanceColor: significanceValueArray.map(item => item.color)
        });
    }

    markAsOccurred () {
        const itemArray = this.state.items;
        this.state.selected.map(selectRow => {
            return itemArray.map(x => {
                return x.idRisk === selectRow ? x.riskOccurred = true : null})
        });
        this.setState(() => ({items: itemArray, selected: []}));
    }

    addRisk (event) {
        event.preventDefault();
        let text =[
            "Niskie",
            "Średnie",
            "Wysokie"
        ];

        const typeOfRiskArray = typeOfRisk.filter(item => item.value === event.target[1].value);
        const significanceValueArray = significanceValue.filter(item => item.value === event.target[2].value * event.target[3].value);
        const idRiskArray = this.state.items.map(item => item.idRisk);

        const newRisk = {
            idRisk: idRiskArray.pop() + 1,
            kindOfRisk: event.target[0].value,
            typeOfRisk: event.target[1].value,
            typeOfRiskColor: typeOfRiskArray.map( item => item.color),
            probability: text[event.target[2].value - 1],
            consequences: text[event.target[3].value - 1],
            significance: significanceValueArray.map(item => item.label),
            significanceColor: significanceValueArray.map(item => item.color),
            riskDescription: event.target[4].value,
            preventiveSupportiveActions: event.target[5].value,
            correctiveActions: event.target[6].value,
            createDate: "2019-06-22",
            createdBy: "Kamil Olszewski",
            riskOccurred: false,
            decision: ""
        };


        this.setState(prevState => ({
            items:[...prevState.items, newRisk]
        }));
        event.target.reset();
        this.setState({significance: ""});


        const options = {
            timeOut: 5000,
            showCloseButton: true,
            progressBar: true,
            position: "top-right"
        };

        const toastrInstance = toastr.success;

        toastrInstance(
            "Nowe ryzyko",
            "Nowe ryzyko zostało pomyślnie dodane",
            options
        );


    }

    render() {

        const riskWithoutOccurred = this.state.items.filter(item => item.riskOccurred === false);
        const riskOccurred = this.state.items.filter(item => item.riskOccurred === true);

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
                    return (
                        <Badge color={row.typeOfRiskColor}>{cell}</Badge>
                    );
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
                    return (
                        <Badge color={row.significanceColor}>{cell}</Badge>
                    );
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

        const expandRow = {
            renderer: row => (
                <div>
                    <p>{`Utworzone przez: ${row.createdBy}`}</p>
                    <p>{`Data utworzenia: ${row.createDate}`}</p>
                    <p>{`Prawdopodobieństwo: ${row.probability}`}</p>
                    <p>{`Wpływ: ${row.consequence}`}</p>
                </div>
            ),
            showExpandColumn: true,
            expandByColumnOnly: true,
            expandHeaderColumnRenderer: ({isAnyExpands}) =>
                isAnyExpands ? (
                    <MinusCircle width={14} height={16}/>
                ) : (
                    <PlusCircle width={16} height={16}/>
                ),
            expandColumnRenderer: ({expanded}) =>
                expanded ? (
                    <MinusCircle width={16} height={16}/>
                ) : (
                    <PlusCircle width={16} height={16}/>
                )
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
                    <Card>
                        <CardHeader>
                            <div className="card-actions float-right">
                                <UncontrolledDropdown>
                                    <DropdownToggle tag="a">
                                        <Menu/>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={() => console.log("Edit")}>Edytuj</DropdownItem>
                                        <DropdownItem onClick={() => this.markAsOccurred()}>Oznacz jako
                                            wystąpiło</DropdownItem>
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
                    {
                        (riskOccurred.length !== 0) ? (
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
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <CardTitle tag="h5" className="mb-0">
                                        Lista ryzyk, które wystąpiły {<Badge
                                        color="secondary"> {riskOccurred.length} </Badge>}
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>

                                </CardBody>
                            </Card>
                        ) : null
                    }
                </>
            );
        }
    };
}

{/*<BootstrapTable*/}
{/*    bootstrap4*/}
{/*    bordered={false}*/}
{/*    keyField="idRisk"*/}
{/*    data={riskOccurred}*/}
{/*    columns={tableColumns}*/}
{/*    selectRow={selectRow}*/}
{/*    expandRow={expandRow}*/}
{/*    striped*/}
{/*    hover*/}
{/*    condensed*/}
{/*    pagination={paginationFactory({*/}
{/*        sizePerPage: 5,*/}
{/*        sizePerPageList: [5, 10, 25, 50]*/}
{/*    })}*/}
{/*/>*/}

const mapStateToProps = (state) => {
    if(!state.riskList.notOccurred){
        return({
            loading: true,
            occurred: '',
            notOccurred: ''
        })
    }else{
        return({
            occurred: state.riskList.occurred,
            notOccurred: state.riskList.notOccurred
        })
    }
};

export default connect(mapStateToProps, null)(ListOfRisk);
