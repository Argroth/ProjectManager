import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            miasto: null
        };

    }

    handleChange = (event) => {

        this.setState({miasto: event.target.value})
    };


    render() {
        return (
            <div>
                podaj miasto: <input type="text" onChange={this.handleChange}/>
                {this.state.miasto}
            </div>
        );
    }
}

export default App;