import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
        Card,
        CardBody,
        CardHeader,
        CardTitle,
        Form,
        FormGroup
} from "reactstrap";
import ToolkitProvider, {Search, CSVExport} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { selectFilter, textFilter} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const {SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const initialStateChangeLog = [
    {
        idProject: 1,
        idLog: 1,
        groupName: "Karta projektu" ,
        subGroupName: "Informacje podstawowe" ,
        fieldName: "Nazwa projektu" ,
        dateAndTime: "02.12.2018  08:11:00" ,
        userName: "Kamil Olszewski" ,
        prevValue: "Projekt absd" ,
        newValue: "Projekt 1" ,
    },
    {
        idProject: 1,
        idLog: 2,
        groupName: "Karta projektu" ,
        subGroupName: "Informacje podstawowe" ,
        fieldName: "Cel główny" ,
        dateAndTime: "02.12.2018  09:01:00" ,
        userName: "Kamil Olszewski" ,
        prevValue: "Cel przykładowy" ,
        newValue: "Cel projektu po zmianie wartości" ,
    },
    {
        idProject: 1,
        idLog: 3,
        groupName: "Ocena ryzyka" ,
        subGroupName: 1,
        fieldName: "Istosność" ,
        dateAndTime: "11.02.2019  14:18:00" ,
        userName: "Kamil Olszewski" ,
        prevValue: "Duża" ,
        newValue: "Średnia" ,
    },
    {
        idProject: 1,
        idLog: 4,
        groupName: "Ocena ryzyka" ,
        subGroupName: 1 ,
        fieldName: "Opis" ,
        dateAndTime: "11.02.2019  14:22:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Opis ryzyka" ,
        newValue: "Brak dostawy, brak dostawy na czas, zła jakość" ,
    },
    {
        idProject: 1,
        idLog: 5,
        groupName: "Ocena ryzyka" ,
        subGroupName: 1 ,
        fieldName: "Działania naprawcze" ,
        dateAndTime: "18.02.2019  09:54:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Dodanie wybiegów do nestingów lub wypalenie wybiegów na osobnych blachach" ,
        newValue: "Dodanie wybiegów do nestingów lub wypalenie wybiegów na osobnych blachach i jeszcze coś tam" ,
    },
    {
        idProject: 1,
        idLog: 6,
        groupName: "Ocena ryzyka" ,
        subGroupName: 3 ,
        fieldName: "Ryzyko wystąpiło" ,
        dateAndTime: "24.04.2019  11:12:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Nie" ,
        newValue: "Tak" ,
    },
    {
        idProject: 1,
        idLog: 7,
        groupName: "Rejestr problemów/zmian" ,
        subGroupName: 2 ,
        fieldName: "Decyzja" ,
        dateAndTime: "11.02.2019  14:18:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Decyzja 1" ,
        newValue: "Decyzja 1 i 2" ,
    },
    {
        idProject: 1,
        idLog: 8,
        groupName: "Rejestr problemów/zmian" ,
        subGroupName: 2,
        fieldName: "Decyzja" ,
        dateAndTime: "15.02.2019  07:21:00" ,
        userName: "Kamil Olszewski" ,
        prevValue: "Decyzja 1 i 2" ,
        newValue: "Całkiem nowa decyzja" ,
    },
    {
        idProject: 1,
        idLog: 9,
        groupName: "Rejestr problemów/zmian" ,
        subGroupName: 2 ,
        fieldName: "Decyzja" ,
        dateAndTime: "21.03.2019  15:08:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Całkiem nowa decyzja" ,
        newValue: "Nie wiem co zrobić" ,
    },
    {
        idProject: 1,
        idLog: 10,
        groupName: "Rejestr problemów/zmian" ,
        subGroupName: 2 ,
        fieldName: "Decyzja" ,
        dateAndTime: "25.03.2019  14:18:00" ,
        userName: "Barbara Walczak" ,
        prevValue: "Nie wiem co zrobić" ,
        newValue: "Wypracowanie kompromisu" ,
    }
];


class ChangeLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeLog: [...initialStateChangeLog]
        }
    }
    render() {

        const selectOptionsGroup = {
            'Karta projektu': 'Karta projektu',
            'Ocena ryzyka': 'Ocena ryzyka',
            'Rejestr problemów/zmian': 'Rejestr problemów/zmian'
        };

        const tableColumns = [
            {
                dataField: "dateAndTime",
                text: "Data i godzina",
                sort: true,
                filter: textFilter({placeholder: 'Data i godzina'}),
            },
            {
                dataField: "userName",
                text: "Nazwa użytkownika",
                sort: true,
                filter: textFilter({placeholder: 'Nazwa użytkownika'}),
            },
            {
                dataField: "groupName",
                text: "Grupa",
                sort: true,
                formatter: cell => selectOptionsGroup[cell],
                filter: selectFilter({
                    placeholder: 'Grupa',
                    options: selectOptionsGroup
                }),
            },
            {
                dataField: "subGroupName",
                text: "Podgrupa",
                sort: true,
                filter: textFilter({placeholder: 'Podgrupa'}),
            },
            {
                dataField: "fieldName",
                text: "Nazwa pola",
                sort: true,
                filter: textFilter({placeholder: 'Nazwa pola'}),
            },
            {
                dataField: "prevValue",
                text: "Poprzednia wartość",
                sort: true,
                filter: textFilter({placeholder: 'Poprzednia wartość'}),
            },
            {
                dataField: "newValue",
                text: "Nowa wartość",
                sort: true,
                filter: textFilter({placeholder: 'Nowa wartość'}),
            }
        ];

        return (
            <Card>
                <CardHeader>
                    <CardTitle tag="h5" className="mb-0">
                        Historia zmian
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <ToolkitProvider
                        keyField="idProject"
                        data={this.state.changeLog}
                        columns={tableColumns}
                        search
                        exportCSV
                    >
                        {
                            props => (
                                <>
                                    <Form inline style={{paddingBottom: '10px'}}>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <SearchBar {...props.searchProps} placeholder="Wyszukaj"/>
                                        </FormGroup>
                                        <ClearSearchButton {...props.searchProps} className="btn-primary" text="Wyczyść" />
                                    </Form>
                                    <BootstrapTable
                                        {...props.baseProps}
                                        classes="table-responsive"
                                        bootstrap4
                                        bordered={false}
                                        keyField="idLog"
                                        striped
                                        hover
                                        condensend
                                        filter={filterFactory()}
                                        pagination={paginationFactory({
                                            sizePerPage: 25,
                                            sizePerPageList: [5, 10, 25, 50]
                                        })}
                                    />
                                    <ExportCSVButton { ...props.csvProps } className="btn-primary">Export CSV</ExportCSVButton>
                                </>
                            )
                        }
                    </ToolkitProvider>
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
  //console.log(state);
    return({
        state
    })
};

export default connect(mapStateToProps, null)(ChangeLog);
