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
        console.log(this.props.projectViewData.meta.createdBy);
        return(
            <div>
                <h1>{this.props.projectViewData.name}</h1>
                <h3>{this.props.projectViewData.owner}</h3>
                <h4>{this.props.projectViewData.meta.createdBy}</h4>
                <h4>{this.props.projectViewData.meta.createdAt}</h4>
                <p>
                    {this.props.projectViewData.description}
                    {this.props.projectViewData.tags}
                </p>

                <br/><br/><br/>
                <input type="button" value="Toggle Chart" onClick={this.handleClick}/>
                { this.state.showChart ? <GanttChart data={this.props.projectViewData.ganttChart} projectID={this.props.projectViewData._id}/>: null }
            </div>
            )
    }


    render() {
        console.log(this.props.projectViewData);
        if(this.props.projectViewData === 'Invalid project ID'){
            return (
                <div>
                    {this.props.projectViewData}
                </div>
            )
        }else if(this.props.projectViewData.name === undefined){
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
    return ({projectViewData: state.projectViewData});
};

const mapDispatchToProps = (dispatch, ownProps) => ({
        fetchProjectData: () => dispatch(fetchProjectData(ownProps.match.params.projectID))
});



export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);