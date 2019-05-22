import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import List from './List';
import '../index.css';
import Background from '../assets/download.png';
import { renameBoard, createList } from '../actions/trello';

const mapStateToProps = (state: any) => {
    return {
        board: state.trello.board,
        lists: state.trello.board.lists
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRenameBoard: (item: any) => {
            dispatch(renameBoard(item));
        },
        onCreateList: (item: any) => {
            dispatch(createList(item));
        }
    };
};

class Board extends Component<{board : any, lists:any, onRenameBoard: any, onCreateList: any,}> {
    constructor(props: any) {
        super(props);
    }

    state = {
        newListInputValue: '',
        newBoardInputValue: '',
        addingList: true,
        renameBoard: false,
        // lists: this.props.lists.length === 0 ? [] : this.props.lists
    }
    handleRenameBoardtInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newBoardInputValue = event.target.value;
        this.setState({
            newBoardInputValue
        })
    }
    handleRenameBoardButtonClicked() {
        this.setState({
            renameBoard: true
        })
    }

    handleBoardRenamed( list: any, event: any) {
        event.preventDefault();
        const newBoardName = this.state.newBoardInputValue;
        this.props.onRenameBoard(newBoardName);
        this.setState({
            // boardName: newBoardName,
            newBoardInputValue: "",
            renameBoard: false
        }, () => {
            console.log("this is updated board -> ", this.state)
        });
    }

    handleNewListCreated() {
        this.setState({
            addingList: false
        })
    }

    handleAddListButtonClicked() {
        this.setState({
            addingList: true
        })
    }

    handleAddNewList(list: any, event: any) {
        event.preventDefault();
        const newListName = event.target.value;
        let newList = [...this.props.board.lists, { id: Math.random() * 12, title: this.state.newListInputValue, cards: [] }];
        this.props.onCreateList(newList);
        this.setState({
            // lists: newList,
            newListInputValue: "",
            addingList: false
        }, () => {
            console.log("this is updated lists -> ", this.props.board)
        });
    }

    handlenewListItemInputChanged(event: any) {
        const newListInputValue = event.target.value;
        this.setState({
            newListInputValue
        })
    }
    render() {
        return (<div style={{ display: 'flex', flexDirection: 'column' }}>
            <header style={{ margin: "15px" }}>
                <h2 style={{ display: 'inline' }}> {this.props.board.boardName} </h2>
                {this.state.renameBoard ? (<form style={{ margin: '0.5em', display: 'inline' }} onSubmit={this.handleBoardRenamed.bind(this, this.props.board)}>
                    <input onChange={this.handleRenameBoardtInputChanged.bind(this)} value={this.state.newBoardInputValue} type="text" placeholder="Rename Board" style={{ padding: '0.5em' }} />
                    <input type="submit" value="Rename Board" />
                </form>) : (<div style={{ display: 'inline' }}>
                    <img src={Background} style={{ display: 'inline', height: '15px', width: '15px' }} onClick={this.handleRenameBoardButtonClicked.bind(this)} />
                </div>)}
            </header>
            <main style={{ flexGrow: 1, height: '100%', display: 'flex' }}>
           
                {this.props.board.lists.map((listItem: any) => {
                    return (<div key={listItem.id}>
                        {/* {item.id} */}
                        <List data={listItem}/>
                    </div>
                    );
                })
                }
                
                <div style={{ width: '20em', flexShrink: 0, textAlign: 'center', padding: '0.5em' }}>
                    <div>
                        {/* <h4 style={{margin: 0}}> Add List </h4> */}
                        <form onSubmit={this.handleAddNewList.bind(this, this.props.board)}>
                            <input type="text" placeholder="add new list" value={this.state.newListInputValue} onChange={this.handlenewListItemInputChanged.bind(this)} />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </main>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)