import * as actionTypes from './actionTypes';

export const taskClosed = (id) => ({ type: actionTypes.taskUpdate, payload: { id, completed: true }});
export const titleUpdate = (id) => ({ type: actionTypes.taskUpdate, payload: { id, title: 'new Title' }});
export const taskDeleted = (id) => ({ type: actionTypes.taskDeleted, payload: { id }});
