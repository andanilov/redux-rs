import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import * as actions from './store/actions';

const App = () => {  
  const [tasks, setTasks] = useState(store.getState());

  // Add listener to update tasks state
  useEffect(() => { store.subscribe(() => setTasks(store.getState()) ); }, []);

  const closeHandle = (id) => () => store.dispatch(actions.taskClosed(id));
  const updateTitleHandle = (id) => () => store.dispatch(actions.titleUpdate(id));
  const deleteTaskHandle = (id) => () => store.dispatch(actions.taskDeleted(id));

  return (
    <>
      <h1>App</h1>
      <ul>
        {tasks.map(({ id, title, completed}) => 
          <li key={id}>
            {`${title} [id: ${id}]: ${ completed ? 'завершена' : 'не завершена'} `}
            <button onClick={closeHandle(id)}>Завершить</button>&nbsp;
            <button onClick={updateTitleHandle(id)}>Изменить название</button>&nbsp;
            <button onClick={deleteTaskHandle(id)}>Удалить</button>
          </li>)}
      </ul>
    </>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
