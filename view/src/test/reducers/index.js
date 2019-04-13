import { combineReducers } from 'redux';

const songsReducer = () => {
    return [
        {title: 'No Scrubs', duration: '2:22'},
        {title: 'Macarena', duration: '3:11'},
        {title: 'Them three', duration: '2:42'},
        {title: 'Freddie', duration: '4:33'},
    ];
};

const selectedSongReducer = (selectedSong='', action) => {
   if(action.type === "SONG_SELECTED") {
       return action.payload;
   }
   return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});