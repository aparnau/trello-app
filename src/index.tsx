import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}
const styles ={
    workspaceContainer: {
        display: 'flex',
        height: '100vh'
    }
}

/* tslint:disable */
// tslint:disable-next-line
const store = createStore(
    reducer,{},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);
/* tslint:enable */

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
