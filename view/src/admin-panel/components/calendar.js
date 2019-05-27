import React, {Component} from 'react';
import { connect } from "react-redux";

class Calendar extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        //this.props.getCalendar()
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Day Off</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>27-05-1994</td>
                        <td><input type="checkbox" checked disabled/></td>
                        <td>Description</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => ({
    getCalendar: () => dispatch()
});

export default connect(null, null)(Calendar);