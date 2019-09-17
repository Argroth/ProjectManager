import {toastr} from "react-redux-toastr";
import React, {Component} from 'react';
const toastrInstance = toastr.success;


const options = {
    timeOut: 5000,
    showCloseButton: true,
    progressBar: true,
    position: "top-right"
};


toastrInstance(
    "Nowe ryzyko",
    "Nowe ryzyko zostało pomyślnie dodane",
    options
);


class ToastrNotification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ToastrNotification;