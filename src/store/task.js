import { createAction, createReducer } from "@reduxjs/toolkit";

const initState = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: false },
];

// Actions
const update = createAction('task/update');
const remove = createAction('task/remove');

// Handlers by actions
export const taskClosed = (id) => update({ id, completed: true });
export const titleUpdate = (id) => update({ id, title: 'new Title' });
export const taskDeleted = (id) => remove({ id });

const findIndexById = (idSearch, arr) => arr.findIndex(({ id }) => id === idSearch);

const taskReducer = createReducer(initState, (builder) => {
    builder
        .addCase(update, (state, action) => {
            const elIndex = findIndexById(action.payload.id, state);
            state[elIndex] = { ...state[elIndex], ...action.payload };
        })
        .addCase(remove, (state, action) => {
            state.splice(findIndexById(action.payload.id, state), 1);
        })
});
export default taskReducer;
