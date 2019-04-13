import React, {Component} from 'react';
import axios from 'axios/index';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordCheck: '',
            token: null,
            resMessage: null
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handlePasswordCheckChange = (event) => {
        this.setState({passwordCheck: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkPassword();
    };

    checkPassword(){
        if(this.state.password === this.state.passwordCheck){
            console.log('match');
            this.submitNewPassword();
        }
        else{
            this.setState({resMessage: 'Passwords must be the same'})
        }
    };

    async submitNewPassword(){
        const response = await axios.post('http://localhost:5000/newpassword', {
            password: this.state.password,
            token: this.props.match.params.token
        },
         {
                withCredentials: true
            });
        this.setState({resMessage: response.data, password: '', passwordCheck: ''});
    };

    async checkToken(){
        const response = await axios.get('http://localhost:5000/verifytoken/'+this.props.match.params.token,{
            withCredentials: true
        });
        this.setState({resMessage: response.data});
    };

    componentDidMount(){
        this.checkToken();
    }

    render() {
        if(!this.state.resMessage){
            return (
                <div>
                    <h1>Loading ...</h1>
                </div>
            )
        }
        if(this.state.resMessage === 'Token incorrect'){
            return(
                <div>
                    <p>{this.state.resMessage}</p>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <p>{this.state.resMessage}</p>
                    <input disabled value={this.props.match.params.token}/>

                    <form onSubmit={this.handleSubmit}>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                        <input type="password" value={this.state.passwordCheck} onChange={this.handlePasswordCheckChange} required/>
                        <input type="submit" value="Wyślij"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChangePassword;