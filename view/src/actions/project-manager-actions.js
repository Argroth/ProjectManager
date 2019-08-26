import axios from 'axios';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_PROJECT_TO_VIEW = 'GET_SPECIFIC_PROJECT_LIST';
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const GET_ALL_USERS = 'GET_ALL_USERS';


export const createProject = (project) => async dispatch => {
    console.log(project);
    const response = await axios.post('http://localhost:5000/project-manager/create-project',
        {project}, {withCredentials: true});
    dispatch({type: CREATE_PROJECT, payload: response});
};

export const getAllProjects = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/project-manager/list-projects');
    dispatch({type: GET_ALL_PROJECTS, payload: response.data})
};

export const fetchProjectData = (id) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data', {projectID: id}, {withCredentials: true});
    dispatch({type: GET_PROJECT_TO_VIEW, payload: response.data})
};

export const createNewTask = (task, ownProps) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project/add-task', {
        task,
        projectID: ownProps
    });
    dispatch({type: CREATE_NEW_TASK, payload: response});
};

export const getAllTasks = () => async dispatch => {
    const response = await axios.post('http://localhost:5000/project/get-tasks',{},)
};

export const getAllUsers = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/admin-panel/user-list');
    dispatch({type: GET_ALL_USERS, payload: response.data})
};
