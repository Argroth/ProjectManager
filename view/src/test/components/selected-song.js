import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectSong} from "../actions";

class SelectedSong extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.songSelected.title}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {songSelected: state.selectedSong};
};

export default connect(mapStateToProps, {selectSong})(SelectedSong);