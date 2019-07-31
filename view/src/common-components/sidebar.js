import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import { UncontrolledCollapse } from 'reactstrap';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggle = index => {
        this.setState(state => ({
            [index]: !state[index]
        }));
    };


    render() {
        return (
            <div className="sidebar sidebar-sticky d-lg-block">
            <div className="sidebar-content">
                <PerfectScrollbar>
                    <a className="sidebar-brand" href="/">
                        <img
                            className="align-middle"
                            alt="Telemond Logo"
                        />
                    </a>

                    <ul className="sidebar-nav">
                        <li className="sidebar-header" id="toggler">Project Manager</li>
                        <li className="sidebar-item ">
                            <UncontrolledCollapse toggler="#toggler">
                                <NavLink to='/project-manager/create-project' className="sidebar-link" activeClassName="active">
                                    Nowy
                                </NavLink>
                                <NavLink to='/project-manager/project-list/preparation' className="sidebar-link" activeClassName="active">
                                    W przygotowaniu
                                </NavLink>
                                <NavLink to='/project-manager/project-list/implementation' className="sidebar-link" activeClassName="active">
                                    W realizacji
                                </NavLink>
                                <NavLink to='/project-manager/project-list/finished' className="sidebar-link" activeClassName="active">
                                    Zakończone
                                </NavLink>
                            </UncontrolledCollapse>
                        </li>
                    </ul>


                        <div className="sidebar-bottom d-none d-lg-block">
                            <div className="media">
                                <img
                                    className="rounded-circle mr-3"
                                    alt="Kamil Olszewski"
                                    width="40"
                                    height="40"
                                />
                                <div className="media-body">
                                    <h5 className="mb-1">Kamil Olszewski</h5>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            className="text-success"
                                        />{" "}
                                        Online
                                    </div>
                                </div>
                            </div>
                        </div>
                </PerfectScrollbar>
            </div>
            </div>
        );
    }
}

export default Sidebar;
