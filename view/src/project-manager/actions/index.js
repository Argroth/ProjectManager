import axios from 'axios';

export const FETCH_TASK = 'fetch_task';
export const FETCH_TASKS = 'fetch_tasks';
export const CREATE_TASK = 'create_task';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=basic1234';

export function fetchTasks() {

    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return{
        type: FETCH_TASKS,
        payload: request
    };
}

export function createTask(values, callback){
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());

    return{
        type: CREATE_TASK,
        payload: request
    };
}

export function fetchTask(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return{
        type: FETCH_TASK,
        payload: request
    }
}