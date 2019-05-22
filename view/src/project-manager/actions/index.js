import axios from 'axios';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_PROJECT_TO_VIEW = 'GET_PROJECT_TO_VIEW';
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';


export const createProject = (project) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/create-project',
        {project});
    dispatch({type: CREATE_PROJECT, payload: response});
};

export const getAllProjects = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/project-manager/list-projects');
    dispatch({type: GET_ALL_PROJECTS, payload: response.data})
};

export const fetchProjectData = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/projectproject')
};

export const createNewTask = (task, ownProps) => async dispatch => {
    console.log(task);
    const response = await axios.post('http://localhost:5000/project/add-task', {
        task,
        projectID: ownProps
    });
    dispatch({type: CREATE_NEW_TASK, payload: response});
};