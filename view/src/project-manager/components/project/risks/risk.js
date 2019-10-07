import React, {Component} from 'react';
import RiskList from './risk-list';
import RiskForm from './risk-form';
import RiskEdit from './risk-edit';
import { connect } from 'react-redux';

class Risk extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <RiskList />
                {this.props.riskID === undefined || null? <RiskForm projectID={this.props.projectID}/>:<RiskEdit projectID={this.props.projectID} riskID={this.props.riskID}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        riskID: state.selectedRisk.risk
    })
};

export default connect(mapStateToProps, null)(Risk);