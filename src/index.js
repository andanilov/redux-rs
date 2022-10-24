import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';
import store from './store/store';
import {
  taskClosed,
  titleUpdate,
  taskDeleted,
  getTasks,
  loadTasks,
  getTaskLoadingStatus,
  createTask,
} from './store/task-slice';

const App = () => {  
  const tasks = useSelector(getTasks);
  const inLoading = useSelector(getTaskLoadingStatus);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(loadTasks()); }, []);

  if (inLoading) return <h1>Loading</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Tasks</h1>
      <br />
      <button onClick={() => dispatch(createTask(`My new task`, false))}>Add task</button>
      <ul>
        {tasks.map(({ id, title, completed}) => 
          <li key={id + Math.random()}>
            {` [id: ${id}]: ${title} ${ completed ? 'завершена' : 'не завершена'} `}<br/>
            <button onClick={() => dispatch(taskClosed(id))}>Завершить</button>&nbsp;
            <button onClick={() => dispatch(titleUpdate(id))}>Изменить название</button>&nbsp;
            <button onClick={() => dispatch(taskDeleted(id))}>Удалить</button>
            <hr />
          </li>)}
      </ul>
    </>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
