export default function createStore(taskReducer, initialState) {
    let state = initialState;
    const listeners = [];

    const getState = () => state;  
    const subscribe = (listener) => listeners.push(listener);
    const dispatch = (action) => {
        state = taskReducer(state, action);
        listeners.forEach((listener) => listener());
    }

    return { getState, dispatch, subscribe };
}
