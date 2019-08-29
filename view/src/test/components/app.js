import React, {Component} from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {notifications: []};
    }

    componentDidMount() {
       socket.on('news', (data) => {
           this.setState({notifications: data});
        });
    }

    handleNewMessage = () => {
        socket.emit('my other event',   {
            type: "request",
            title: "New connection",
            description: "Anna accepted your request.",
            time: "12h ago"
        });
    };


    render() {
        return (
            <div>
                {this.state.notifications.map(item => {
                    return(
                        <ul>
                        <li>{item.type}</li>
                        <li>{item.name}</li>
                        <li>{item.description}</li>
                        </ul>
                    )
                })}
                <button onClick={this.handleNewMessage}>log</button>
            </div>
        );
    }
}

export default App;