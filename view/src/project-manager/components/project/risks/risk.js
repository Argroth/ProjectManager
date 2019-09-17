import React, {Component} from 'react';
import RiskList from './risk-list';
import RiskForm from './risk-form';

class Risk extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <RiskList />
                <RiskForm projectID={this.props.projectID}/>
            </div>
        );
    }
}


export default Risk;