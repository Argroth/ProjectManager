import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';
import SelectedSong from './selected-song';

class SongList extends Component {

    renderList(){
        return this.props.songs.map((song)=> {
            return(
                <div key={song.title}>
                     <button onClick={() => this.props.selectSong(song)}>
                         Select
                     </button>

                    <div>{song.title}</div>
                </div>
            );
        });
    };

    render() {
        console.log(this.props);
        return (
            //this.props === {songs: state.songs}
            //from mapStateToProps
            <div>
                {this.renderList()}

                <div>
                    <br/><br/><br/>
                    <SelectedSong />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {songs: state.songs};
};

export default connect(mapStateToProps, {selectSong})(SongList);