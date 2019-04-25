import axios from 'axios';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';


export const createProject = (project) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project',
        {project});
    dispatch({type: CREATE_PROJECT, payload: response});
};

export const getAllProjects = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/projects');
    dispatch({type: GET_ALL_PROJECTS, payload: response.data})
};