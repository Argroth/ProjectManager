import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios/index';

export default function withAuth(ComponentToProtect) {

    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                redirect: false,
                response: null
            };
        };

        componentDidMount() {
            this.checkToken();
        };

        async checkToken(){
            const response = await axios.post('http://localhost:5000/auth/check-user-token', {}, {
                withCredentials: true
            });
            this.setState({response: response.data});
            if(this.state.response === 'Unauthorized'){
                this.setState({loading: false, redirect: true})
            } else {
                this.setState({loading: false, redirect: false})
            }
        };

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return <div>Loading...</div>;
            }
            if (redirect) {
                return <Redirect to="/auth/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }

}