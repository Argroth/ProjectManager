import React, {Component} from 'react';
import axios from 'axios';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

    this.state = {
        email: '',
        resMessage: null
    };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleEmailChange = (event) => {
    this.setState({email: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.sendEmailWithToken();
    };

    async sendEmailWithToken(){
        const response = await axios.post('http://localhost:5000/resetpassword', {
                email: this.state.email
            },
            {
                withCredentials: true
            });
        this.setState({resMessage: response.data})
    }


    render() {
        if(this.state.resMessage){
            return (
                <div>
                    <h2>{this.state.resMessage}</h2>
                </div>
            )
        }
        return (
            <div>
                <p>Podaj email aby zresetować hasło:</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    <input type="submit" value="Wyślij"/>
                </form>
            </div>
        );
    }
}

export default ResetPassword;