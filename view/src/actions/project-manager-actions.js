import axios from 'axios';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_PROJECT_DATA = 'GET_PROJECT_DATA';
export const CREATE_NEW_RISK = 'CREATE_NEW_RISK';
export const GET_RISK_LIST = 'GET_RISK_LIST';
export const GET_CALENDAR = 'GET_CALENDAR';
export const MARK_RISK_TO_EDIT = 'MARK_RISK_TO_EDIT';
export const GET_RISK_DATA = 'GET_RISK_DATA';
export const GET_TASK_LIST = 'GET_TASK_LIST';
export const MARK_TASK_TO_EDIT = 'MARK_TASK_TO_EDIT';

export const createProject = (project) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/create-project',
        {project}, {withCredentials: true});
    dispatch({type: CREATE_PROJECT, payload: response});
};

export const getAllProjects = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/project-manager/list-projects');
    dispatch({type: GET_ALL_PROJECTS, payload: response.data})
};


export const createNewTask = (task, ownProps) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project/add-task', {
        task,
        projectID: ownProps
    });
    dispatch({type: CREATE_NEW_TASK, payload: response});
};

export const getAllUsers = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/admin-panel/user-list');
    dispatch({type: GET_ALL_USERS, payload: response.data})
};

export const getProjectData = (projectID) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data', {projectID});
    dispatch({type: GET_PROJECT_DATA, payload: response.data})
};

export const createNewRisk = (risk, projectID) => async dispatch => {
    console.log(risk, projectID);
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-create', {risk, projectID}, {withCredentials: true});
    dispatch({type: CREATE_NEW_RISK, payload: response.data});
    if(response){
        const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-list', {projectID});
        dispatch({type: GET_RISK_LIST, payload: response.data});
    }
};

export const getRiskList = (projectID) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-list', {projectID});
    dispatch({type: GET_RISK_LIST, payload: response.data});
};

export const markRiskAsOccurred = (risks) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-occurred', {risks});
    console.log(response);
};

export const getRisk = (risk) => async dispatch => {
    console.log(risk);
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk', {risk});
    dispatch({type: GET_RISK_DATA, payload: response.data});
};

export const riskToEdit = (risk) => async dispatch => {
    dispatch({type: MARK_RISK_TO_EDIT, payload: risk});
};

export const editRisk = (risk) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-edit', {risk});
    const projectID = response.data.projectID;
    if(response){
        console.log(projectID);
        const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-list', {projectID});
        dispatch({type: GET_RISK_LIST, payload: response.data});
    }
};

export const decisionRisk = (decision, risks) => async dispatch => {
    console.log(risks);
    const response = await axios.post('http://localhost:5000/project-manager/project-data/risk-decision', {decision, risks});
};

export const getCalendar = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/calendar/get-dates');
    dispatch({type: GET_CALENDAR, payload: response.data});
};

export const getTaskList = (projectID) => async dispatch => {
    const response = await axios.post('http://localhost:5000/project-manager/project-data/task-list', {projectID});
    dispatch({type: GET_TASK_LIST, payload: response.data});
};

export const editTask = (task) => async dispatch => {
    console.log(task);
  const response = await axios.post('http://localhost:5000/project-manager/project-data/edit-task', {task})
};