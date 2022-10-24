export function thunk({ getState, dispatch }) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            if (typeof action !== 'function') {
                return next(action);
            } else {
                return action(dispatch, getState);
            }
        }
    }
}