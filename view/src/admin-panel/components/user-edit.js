import React, {Component} from 'react';
import { connect } from "react-redux";
import { Checkbox } from "semantic-ui-react";


class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            company: '',
            department: '',
            departmentRole: '',
            globalRole: '',
            panelAdminPermission: this.props.editUser.access.adminPanel,
            projectManagerPermission: this.props.editUser.access.projectManager
        };
        console.log(this.state);
        this.onChangeAdminPerm = this.onChangeAdminPerm.bind(this);
        this.onChangeProjectManagerPerm = this.onChangeProjectManagerPerm.bind(this);
    };

    onChangeAdminPerm(){
        if(this.state.panelAdminPermission === false){
            this.setState({panelAdminPermission: true});
        }

        if(this.state.panelAdminPermission === true){
            this.setState({panelAdminPermission: false});

        }
    };

    onChangeProjectManagerPerm(){

        if(this.state.projectManagerPermission === false){
            this.setState({projectManagerPermission: true});
        }

        if(this.state.projectManagerPermission === true){
            this.setState({projectManagerPermission: false});

        }
    };

    getState = () => {
        console.log(this.state);
    };

    render() {
      if(!this.props.editUser){
          return(
              <div>Loading...</div>
          )
      }else{
          return (
              <div>
                  Edit User:
                  <form action=""><br/>
                      <input type="text" defaultValue={this.props.editUser.meta.name}/><br/>
                            <select>
                                <option defaultValue={this.props.editUser.meta.company}>{this.props.editUser.meta.company}</option>
                                <option value="Teleskop">Teleskop</option>
                                <option value="Montel">Montel</option>
                                <option value="Henschel">Henschel</option>
                                <option value="Teleyard">Teleyard</option>
                            </select><br/>
                      <input type="text" defaultValue={this.props.editUser.meta.department}/><br/>
                      <input type="text" defaultValue={this.props.editUser.meta.departmentRole}/><br/>
                      <input type="text" defaultValue={this.props.editUser.globalRole}/><br/>
                      <div>
                          <span>
                              <p>Permissions :</p>
                      <Checkbox toggle label='Panel Admin' onClick={this.onChangeAdminPerm}/><br/>
                      <Checkbox toggle  label='Project Manager' onClick={this.onChangeProjectManagerPerm}/>
                          </span>
                      </div>
                      <input type="submit" value='Submit'/>
                  </form>

                  <button onClick={this.getState}>GetState</button>
              </div>
          )
      }
    }
}



const mapStateToProps = (state) => {
    return ({editUser: state.selectedUser});
};

export default connect(mapStateToProps, null)(UserEdit);