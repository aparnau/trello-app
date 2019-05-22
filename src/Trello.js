// eslint-disable-next-line
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import TrelloReducer from './TrelloReducer';

// export default function TodoList(props) {
export default class Trello extends Component {    
    
    // handleAddButtonClicked() {
    //     console.log('props',this.props);
    // }
    render() {
        return(
            <div>
            <input type ="text"/>
            <button onClick={this.handleAddButtonClicked.bind(this)}> Add item </button>
                <ul>
                    {this.props.items ? this.props.items.map(i => <li key={i.id}> {i.text} </li>): null}
                </ul>
            </div>
        );
    }
}