import *  as actions from './actionTypes';

const findIndexById = (idSearch, arr) => arr.findIndex(({ id }) => id === idSearch);

export default function taskReducer(state, action) {
    const newArr = [...state];

    switch (action.type) {
        case actions.taskUpdate:
            const elIndex = findIndexById(action.payload.id, newArr);
            newArr[elIndex] = { ...newArr[elIndex], ...action.payload };
            return newArr;

        case actions.taskDeleted:
            newArr.splice(findIndexById(action.payload.id, newArr), 1);
            return newArr;

        default: return state;
    }
};
