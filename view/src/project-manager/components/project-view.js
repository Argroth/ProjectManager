import React, {Component} from 'react';
import { connect } from "react-redux";
import GanttChart from './gantt-chart';
import { fetchProjectData } from "../actions";


class ProjectView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChart: false
        };

        this.props.fetchProjectData();
    };

    handleClick = () => {
        this.setState({showChart: !this.state.showChart})
    };

    renderProjectData(){
        const project = this.props.projectViewData;
        return(
            <div>
                <h1>Project name: {project.projectName}</h1>
                <h3>Project goal: {project.projectGoal}</h3>
                <h4>Project scope: {project.projectScope}</h4>
                <h4>Project reasons: {project.projectReasons}</h4>
                {project.projectBenefits.map(benefit => {
                    return(
                        <div>
                        <h4>{benefit.projectBenefitData}</h4>
                    </div>
                    )
                })}
                <h4>Start date: {project.projectStartDate}</h4>
                <h4>End date: {project.projectEndDate}</h4>
                <h4>Project budget: {project.projectBudget.value + project.projectBudget.currency} </h4>
                <h4>Project manager: {project.projectManager}</h4>

                <h4>{project.projectSteeringComitee.length <= 1? 'Project owner: ' : 'Steering comitee: '}</h4>
                {project.projectSteeringComitee.map(member => {
                    return(
                            <div key={member.steeringComiteeMember}>
                                <h4>{member.steeringComiteeMember}</h4>
                            </div>
                    )
                })}
                <br/>
                <h4>Project team:</h4>
                {project.projectTeam.map(teamMember => {
                    return(
                        <div key={teamMember.projectTeamMember}>
                            <h4>{teamMember.projectTeamMember}</h4>
                        </div>
                    )
                })}
                <br/>
                {project.projectStages.map(stage => {
                    return(
                        <div key={stage.projectStage}>
                            <h4>Project stage: {stage.projectStage}</h4>
                            <h3>Project stage result: {stage.projectStageResult}</h3>
                        </div>
                    )
                })}
                <br/>
                {project.projectKPI.map(kpi => {
                    return(
                        <div key={kpi.kpiName}>
                            <h4>KPI: {kpi.kpiName}</h4>
                            <h3>KPI target value: {kpi.kpiTargetValue}</h3>
                        </div>
                    )
                })}


                <br/><br/>
                <input type="button" value="Toggle Chart" onClick={this.handleClick}/>
                { this.state.showChart ? <GanttChart data={this.props.projectViewData.ganttChart} projectID={this.props.projectViewData._id}/>: null }
            </div>
            )
    }


    render() {
        if(this.props.projectViewData === 'Invalid project ID'){
            return (
                <div>
                    {this.props.projectViewData}
                </div>
            )
        }else if(this.props.projectViewData.projectName === undefined){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else{
            return (
                <div>
                    {this.renderProjectData()}
                </div>
            );
        }
    }

}


const mapStateToProps = (state) => {
    console.log(state);
    return ({projectViewData: state.projectViewData});
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        fetchProjectData: () => dispatch(fetchProjectData(ownProps.match.params.projectID))
});



export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);