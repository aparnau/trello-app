import { combineReducers } from 'redux';
import trelloReducer from './trelloReducer';

interface IState {
    trello: any;
}

const state : IState = {
    trello: trelloReducer
};

export default combineReducers(state);

