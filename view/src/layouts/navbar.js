import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../actions/sidebar-actions";
import { logoutUser } from '../actions/auth-actions';
import { switchLanguage } from "../actions/language-actions";


import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  Settings,
  User,
  UserPlus
} from "react-feather";

import usFlag from "../assets/img/flags/us.png";
import plFlag from "../assets/img/flags/pl.png";


import avatar1 from "../assets/img/avatars/avatar.jpg";
import avatar3 from "../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../assets/img/avatars/avatar-5.jpg";


const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago"
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago"
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago"
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago"
  }
];



const messages = [
  {
    name: "Ashley Briggs",
    avatar: avatar5,
    description: "Nam pretium turpis et arcu. Duis arcu tortor.",
    time: "15m ago"
  },
  {
    name: "Chris Wood",
    avatar: avatar1,
    description: "Curabitur ligula sapien euismod vitae.",
    time: "2h ago"
  },
  {
    name: "Stacie Hall",
    avatar: avatar4,
    description: "Pellentesque auctor neque nec urna.",
    time: "4h ago"
  },
  {
    name: "Bertha Martin",
    avatar: avatar3,
    description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
    time: "5h ago"
  }
];

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);




class NavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {language: window.sessionStorage.getItem('language')};
  }


  render() {

    const logout = () => {
      localStorage.clear();
      sessionStorage.clear();
      this.props.logoutUser();
    };

    const handleLanguageChange = (value) => {
      window.sessionStorage.setItem("language", value);
      this.setState({language: value});
      this.props.switchLanguage(value);

    };

    return (
        <div>
          <Navbar color="white" light expand>
      <span
          className="sidebar-toggle d-flex mr-2"
          onClick={() => {

          }}
      >
        <i className="hamburger align-self-center" />
      </span>

            <Form inline>
              {/*<Input*/}
              {/*  type="text"*/}
              {/*  placeholder="Search projects..."*/}
              {/*  aria-label="Search"*/}
              {/*  className="form-control-no-border mr-sm-2"*/}
              {/*/>*/}
              <renderSelect />
            </Form>

            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavbarDropdown
                    header="New Messages"
                    footer="Show all messages"
                    icon={MessageCircle}
                    count={messages.length}
                    showBadge
                >
                  {messages.map((item, key) => {
                    return (
                        <NavbarDropdownItem
                            key={key}
                            icon={
                              <img
                                  className="avatar img-fluid rounded-circle"
                                  src={item.avatar}
                                  alt={item.name}
                              />
                            }
                            title={item.name}
                            description={item.description}
                            time={item.time}
                            spacing
                        />
                    );
                  })}
                </NavbarDropdown>

                <NavbarDropdown
                    header="New Notifications"
                    footer="Show all notifications"
                    icon={BellOff}
                    count={notifications.length}
                >
                  {notifications.map((item, key) => {
                    let icon = <Bell size={18} className="text-warning" />;

                    if (item.type === "important") {
                      icon = <AlertCircle size={18} className="text-danger" />;
                    }

                    if (item.type === "login") {
                      icon = <Home size={18} className="text-primary" />;
                    }

                    if (item.type === "request") {
                      icon = <UserPlus size={18} className="text-success" />;
                    }

                    return (
                        <NavbarDropdownItem
                            key={key}
                            icon={icon}
                            title={item.title}
                            description={item.description}
                            time={item.time}
                        />
                    );
                  })}
                </NavbarDropdown>


                <UncontrolledDropdown nav inNavbar className="mr-2">
                  <DropdownToggle nav caret className="nav-flag">
                    { this.props.language === 'PL'? <img src={plFlag} alt="Polish" /> : <img src={usFlag} alt="English" /> }
                  </DropdownToggle>
                  <DropdownMenu right>
                    <div onClick={() => handleLanguageChange('EN')}>
                    <DropdownItem>
                      <img
                          src={usFlag}
                          alt="English"
                          width="20"
                          className="align-middle mr-1"
                      />
                      <span className="align-middle">English</span>
                    </DropdownItem>
                    </div>
                    <div  onClick={() => handleLanguageChange('PL')}>
                    <DropdownItem>
                      <img
                          src={plFlag}
                          alt="Polish"
                          width="20"
                          className="align-middle mr-1"
                      />
                      <span className="align-middle">Polish</span>
                    </DropdownItem>
                    </div>

                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
                  <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                    src={avatar1}
                    className="avatar img-fluid rounded-circle mr-1"
                    alt="Chris Wood"
                />
                <span className="text-dark">{window.sessionStorage.getItem("name")}</span>
              </DropdownToggle>
            </span>
                  <DropdownMenu right>
                    <DropdownItem>
                      <User size={18} className="align-middle mr-2" />
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={logout}>Sign out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  if(state.session.meta === undefined){
    return({
      name: '',
      language: state.language
    })
  }else{
    window.sessionStorage.setItem("name", state.session.meta.name);
    window.sessionStorage.setItem("language", state.session.meta.defaultLanguage);
    return ({
      name: state.session.meta.name,
      language: state.session.meta.defaultLanguage
    });
  }
};

const mapDispatchToProps = (dispatch) =>({
      logoutUser: () => dispatch(logoutUser()),
      switchLanguage: (language) => dispatch(switchLanguage(language))
});


export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
