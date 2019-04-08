import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state={
            email: '',
            name: '',
            department: '',
            departmentRole: '',
            company: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
        this.handleDepartmentRoleChange = this.handleDepartmentRoleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        this.register();
    }

    async register(){
        const response = await axios.post('http://localhost:5000/register', {
                email: this.state.email,
                name: this.state.name,
                department: this.state.department,
                departmentRole: this.state.departmentRole,
                company: this.state.company
            },
            {
            withCredentials: true,
            headers: {
            'Content-Type': 'application/json'
        }});

        console.log(response);
    };



    handleEmailChange(event){
      this.setState({email: event.target.value});
    };

    handleNameChange(event){
      this.setState({name: event.target.value})
    };

    handleDepartmentChange(event){
      this.setState({department: event.target.value});
    };

    handleDepartmentRoleChange(event){
        this.setState({departmentRole: event.target.value});
    };

    handleCompanyChange(event){
      this.setState({company: event.target.value});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br/>
                    <label>
                        Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <br/>
                    <label>
                        Department:
                    <input type="text" value={this.state.department} onChange={this.handleDepartmentChange}/>
                    </label>
                    <br/>
                    <label>
                        Department Role
                    <input type="text" value={this.state.departmentRole} onChange={this.handleDepartmentRoleChange}/>
                    </label>
                    <br/>
                    <label>
                        Company:
                        <select value={this.state.company} onChange={this.handleCompanyChange}>
                            <option value="">Wybierz Firmę</option>
                            <option value="Teleskop">Teleskop</option>
                            <option value="Montel">Montel</option>
                            <option value="Henschel">Henschel</option>
                            <option value="Teleyard">Teleyard</option>
                        </select>
                    </label>
                    <br/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        );
    }
}

export default Register;