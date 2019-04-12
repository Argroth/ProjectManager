import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {

    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                redirect: false,
                response: ''
            };
        }

        componentDidMount() {
            this.checkToken();
        }

        async checkToken(){
            const response = await axios.get('http://localhost:5000/checktoken', {
                withCredentials: true
            });

            this.setState({response: response.status});

            if(!this.state.response === ''){
                this.setState({loading: false, redirect: true})
            } else {
                this.setState({loading: false})
            }
            // if(response.status === 200){
            //     this.setState({loading: false});
            // } else if(response == null){
            //     this.setState({loading: false, redirect: true});
            // }
        }

        render() {
            const { loading, redirect } = this.state;
            console.log(this.state);
            if (loading) {
                return <div>Loading ...</div>;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }

}