import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

    }


    onFormSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state.term);
    };
//TODO change onchange to separate function

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} action="" className="ui form">
                    <div className="field">
                        <label>Image Search</label>
                        <input type="text"
                               value={this.state.term}
                               onChange={(e)=>this.setState({term: e.target.value})}/>
                    </div>
                </form>
            </div>
        );
    }
}


export default SearchBar;