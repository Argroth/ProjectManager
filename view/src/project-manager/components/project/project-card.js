//import dependencies
import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
import {toastr} from "react-redux-toastr";
import { connect } from 'react-redux';

//import actions
import {getAllUsers, getProjectData, getRiskList, getCalendar} from "../../../actions/project-manager-actions";


//import components
import Risk from "./risks/risk";
import ProjectCard from '../project-edit';
import Register from "./register/register";
import Report from "./report/report";
import ChangeLog from "./change-log/change-log";
import GanttChart from "./gantt/gantt-chart";

const impactOnProject = [
    {value: "1", label: "Niski", color: "primary"},
    {value: "2", label: "Średni", color: "warning"},
    {value: "3", label: "Wysokie", color: "danger"}
];


const initialStateRegister = [
    {
        idRegister: 1,
        subject: "Temat 1",
        description: "Różne wizje na temat potrzeb - różne rozmiary",
        notifyingUser: "Tomasz Jakubiec",
        dateOfApplication: "2019-05-30",
        impact: "Wysoki",
        impactColor: "danger",
        correctiveActions: "Sprawdzenie cen na inne wymiary, wybór optymalnych wymiarów",
        decision: "Wypracowanie kompromisu"
    },
    {
        idRegister: 2,
        subject: "Temat 2",
        description: "Zmiana wymiarów z 80x80x6, również na inne wymiary w zależności od potrzeb.",
        notifyingUser: "Paweł Domeracki",
        dateOfApplication: "2019-06-12",
        impact: "Średni",
        impactColor: "warning",
        correctiveActions: "",
        decision: "Zmiana wymiarów na: 80x80x6 (produkcja i szkółka), 40x40x6 (Baugrupa), 80x80x12 (maszty w teleyardzie)"
    }
];

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            projectStatus: "1",
            activeTab: "1",
            valueTypeInformation: "",
            register: [...initialStateRegister]
        };

        this.addRegister = this.addRegister.bind(this);
        this.handleChangeTypeInformation = this.handleChangeTypeInformation.bind(this);
    };

    componentDidMount() {
        this.props.getTeam();
        this.props.getProjectData(this.props.projectID);
        this.props.getRiskList(this.props.projectID);
        this.props.getCalendar();
    };


    toggle(tab){
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };


    handleChangeTypeInformation (event) {
        this.setState( {valueTypeInformation : event.target.value});
    };



    addRegister (event) {
        event.preventDefault();

        const impactOnProjectArray = impactOnProject.filter(item => item.value === event.target[1].value);
        const idRegisterArray = this.state.register.map(item => item.idRegister);

        const newRegister = {
            idRegister: idRegisterArray.pop() + 1,
            subject: event.target[0].value,
            description: event.target[2].value,
            notifyingUser: "Kamil Olszewski",
            dateOfApplication: "2019-06-22",
            impact: impactOnProjectArray.map(item => item.label),
            impactColor: impactOnProjectArray.map(item => item.color),
            correctiveActions: event.target[3].value,
        };

        this.setState(prevState => ({
            register:[...prevState.register, newRegister]
        }));
        event.target.reset();


        const options = {
            timeOut: 5000,
            showCloseButton: true,
            progressBar: true,
            position: "top-right"
        };

        const toastrInstance = toastr.success;

        toastrInstance(
            "Nowy problem/ zmiana",
            "Nowy problem / zmiania został pomyślnie zarejstrowany",
            options
        );

    }

    render() {
        return (
    <Container fluid className="p-0">
       <h1 className="h3 mb-3">{this.props.projectName}</h1>
         <Row>
           <Col>
            <Card>
                <CardHeader>
                    <Nav tabs className="card-header-tabs">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "1" })}
                                onClick={() => {
                                    this.toggle("1");
                                }}
                                href="#"
                            >
                                Karta projektu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "2" })}
                                onClick={() => {
                                    this.toggle("2");
                                }}
                                href="#"
                            >
                                Ocena ryzyka
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "3" })}
                                onClick={() => {
                                    this.toggle("3");
                                }}
                                href="#"
                            >
                                Rejestr problemów / zmian
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "4" })}
                                onClick={() => {
                                    this.toggle("4");
                                }}
                                href="#"
                            >
                                Zgłoszenie
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "5" })}
                                onClick={() => {
                                    this.toggle("5");
                                }}
                                href="#"
                            >
                                Historia
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === "6" })}
                                onClick={() => {
                                    this.toggle("6");
                                }}
                                href="#"
                            >
                                Gantt
                            </NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>

                <CardBody>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                             <ProjectCard />
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="2">
                            <Risk projectID={this.props.projectID}/>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="3">
                            <Register register={this.state.register}/>
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="4">
                            <Report
                                submitRegister={this.addRegister}
                                changeTypeInformation={this.handleChangeTypeInformation}
                                state={this.state}
                                submitFn={this.addRisk}
                                changeProbability={this.handleChangeProbability}
                                changeConsequences={this.handleChangeConsequences}
                            />
                        </TabPane>
                    </TabContent>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="5">
                            <ChangeLog />
                        </TabPane>
                    </TabContent>

                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="6">
                            <GanttChart  projectID={this.props.projectID} data={this.props.ganttChart} calendar={this.props.calendar} />
                        </TabPane>
                    </TabContent>

                </CardBody>
            </Card>
         </Col>
      </Row>
     </Container>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    getTeam: () => dispatch(getAllUsers()),
    getProjectData: (projectID) => dispatch(getProjectData(projectID)),
    getRiskList: (projectID) => dispatch(getRiskList(projectID)),
    getCalendar: () => dispatch(getCalendar())
});

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    if(!state.projectData.ganttChart){
        return({
            projectID: ownProps.match.params.projectID,
            projectName: state.projectData.projectName,
            ganttChart: [],
            calendar: state.calendar
        })
    }else
    {
        return ({
            projectID: ownProps.match.params.projectID,
            projectName: state.projectData.projectName,
            ganttChart: state.projectData.ganttChart,
            calendar: state.calendar
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
