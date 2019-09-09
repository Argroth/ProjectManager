import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

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
                        <li className="sidebar-header" id="toggler">{this.props.language === 'PL'? 'Mendżer projektów' : 'Project Manager' }</li>
                        <li className="sidebar-item ">
                            <UncontrolledCollapse toggler="#toggler">
                                <NavLink to='/project-manager/create-project' className="sidebar-link" activeClassName="active">
                                    {this.props.language === 'PL'? 'Nowy' : 'New' }
                                </NavLink>
                                <NavLink to='/project-manager/project-list/preparation' className="sidebar-link" activeClassName="active">
                                    {this.props.language === 'PL'? 'W Przygotowaniu' : 'In Preparation' }
                                </NavLink>
                                <NavLink to='/project-manager/project-list/implementation' className="sidebar-link" activeClassName="active">
                                    {this.props.language === 'PL'? 'W Realizacji' : 'In Implementation' }
                                </NavLink>
                                <NavLink to='/project-manager/project-list/finished' className="sidebar-link" activeClassName="active">
                                    {this.props.language === 'PL'? 'Zakończone' : 'Finished' }
                                </NavLink>
                            </UncontrolledCollapse>
                        </li>
                    </ul>


                </PerfectScrollbar>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        language: state.language
    })
};

export default connect(mapStateToProps, null)(Sidebar);
