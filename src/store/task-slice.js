import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities:[], isLoading: true };

const findIndexById = (idSearch, arr) => arr.findIndex(({ id }) => id === idSearch);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        update(state, action) {
            const elIndex = findIndexById(action.payload.id, state.entities);
            state.entities[elIndex] = { ...state.entities[elIndex], ...action.payload };
        },
        remove(state, action) {
            state.entities.splice(findIndexById(action.payload.id, state.entities), 1);
        },
        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        requested(state) {
            state.isLoading = true;
        },
        requestFailed(state, action) {
            state.isLoading = false;
        },
        create(state, action) {
            state.entities.unshift(action.payload);
        }
    }
});
const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, requested, requestFailed, create } = actions;

// Handlers by actions
export const taskClosed = (id) => (dispatch, getState) => dispatch(update({ id, completed: true }));
export const titleUpdate = (id) => (dispatch, getState) => dispatch(update({ id, title: 'new Title' }));
export const taskDeleted = (id) => (dispatch, getState) => dispatch(remove({ id }));
export const loadTasks = () => async (dispatch) => {
    dispatch(requested());
    try {
        const data = await todosService.fetch();
        dispatch(received(data));
    } catch (e) {        
        dispatch(requestFailed(e.message));
        dispatch(setError(e.message));
    }
};
export const createTask = (title, isCompleted) => async (dispatch) => {
    try {
        const data = await todosService.add(title, isCompleted);
        dispatch(create(data));
    } catch (e) {        
        dispatch(setError(e.message));
    }
};



export const getTasks = (state) => state.tasks.entities;
export const getTaskLoadingStatus = (state) => state.tasks.isLoading;

export default taskReducer;
