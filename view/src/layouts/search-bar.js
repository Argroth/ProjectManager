import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({term: event.target.value});
        console.log(this.state);
    }

    onFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
    };
//TODO change onchange to separate function

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" value={this.state.term} placeholder={this.props.searchLabel} onChange={this.handleInputChange}/>
                </form>
            </div>
        );
    }
}


export default SearchBar;