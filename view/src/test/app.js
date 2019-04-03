import React from 'react';
import axios from 'axios';
import SearchBar from '../common-components/search-bar';


class App extends React.Component{
    state = {images: []};


    onSearchSubmit = async (term) => {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {query: term},
            headers: {
                Authorization: 'Client-ID 431f163c7b119f53bd640035dc305fcdc4d78ad1580cfcae89c4c02825b5ecdc'
            }
        });
        this.setState({images: response.data.results});
    }

    render() {
        return (<div className="ui container">
                <SearchBar onSubmit={this.onSearchSubmit} />
                <h2>Found: {this.state.images.length}</h2>
            </div>
        );
    }
}

export default App;