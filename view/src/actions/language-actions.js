export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';


export const switchLanguage = (language) => async dispatch => {
        console.log(language);
    dispatch({type: LANGUAGE_CHANGE, payload: language});
};
