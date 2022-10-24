import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from './task-slice';
import { logger } from './middleware/logger';
import errorReducer from './errors';

const rootReducer = combineReducers({ 
  errors: errorReducer,
  tasks: taskReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    logger,
  ],
  devTools: process.env.MODE_ENV !== 'production',
});

export default store;
