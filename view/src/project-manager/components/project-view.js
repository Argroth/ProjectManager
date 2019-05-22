import React, {Component} from 'react';
import { connect } from "react-redux";
import GanttChart from './gantt-chart';


class ProjectView extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {showChart: false};
        this.project = this.props.match.params.projectID;
    };

    handleClick = () => {
        this.setState({showChart: !this.state.showChart})
    };

    render() {
        return (
            <div>
                <h1>{this.project.name}</h1>
                <h3>{this.project.owner}</h3>
                <h3>{this.project.meta.createdBy}</h3>
                <p>
                    {this.project.description}
                    {this.project.tags}
                </p>

                <br/><br/><br/>
                <input type="button" value="Toggle Chart" onClick={this.handleClick}/>
                { this.state.showChart ? <GanttChart data={this.project.ganttChart} projectID={this.props.project._id}/>: null }
            </div>
        );
    }

}
const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps.match.params.projectID);
    return ({project: state.viewProject});
};


export default connect(mapStateToProps, null)(ProjectView);