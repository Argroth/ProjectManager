import React, {Component} from 'react';
import axios from "axios/index";

class CreatePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resMessage: null,
            password: '',
            passwordCheck: ''
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    componentDidMount() {
        this.checkToken();
    };

    async checkToken(){
        const response = await axios.get('http://localhost:5000/verify/' + this.props.match.params.token, {
            withCredentials: true
        });
        this.setState({resMessage: response.data});
        console.log(response);
    };

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    };

    handlePasswordCheckChange(event){
        this.setState({passwordCheck: event.target.value});
    };


    handleSubmit(event){
        event.preventDefault();
        this.checkPassword();
    };

    checkPassword(){
        if(this.state.password === this.state.passwordCheck){
            console.log('match');
            this.submitNewPassword();
        }
        else{
            console.log('missmatch');
        }
    };

    submitNewPassword(){
        const response = axios.post('http://localhost:5000/createpassword',{
            password: this.state.password,
            token: this.props.match.params.token
        },{
            withCredentials: true
        });

        console.log(response);
    };




    render() {
        if(!this.state.resMessage){
            return (
                <div>
                   Checking Token...
                </div>
            )
        }
        if(this.state.resMessage === 'Token is correct'){
            return (
                <div>
                    <p>{this.state.resMessage}</p>
                    <input disabled value={this.props.match.params.token}/>

                    <form onSubmit={this.handleSubmit}>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                        <input type="password" value={this.state.passwordCheck} onChange={this.handlePasswordCheckChange} required/>
                        <input type="submit" value="Wyślij"/>
                    </form>
                </div>
            )
        }
        if(this.state.resMessage === 'Token is incorrect'){
            return (
                <div>
                    {this.state.resMessage}
                </div>
            )
        }
    }
}

export default CreatePassword;