import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { editList, moveList, createCard } from '../actions/trello';
import Card, {CardData} from './Card';
import Background from '../assets/download.png';

export interface ListData {
    id: string,
    title: string,
    cards: CardData[]  
}

interface ListProps {
    data: ListData,
    onRenameList: any,
    onMoveList: any,
    onCreateCard: any,
    lists : any
}

const mapStateToProps = (state: any) => {
    return {
        lists: state.trello.board.lists
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRenameList: (item: any) => {
            dispatch(editList(item));
        },
        onMoveList: (item: any,) => {
            dispatch(moveList(item));
        },
        onCreateCard: (item: any) => {
            dispatch(createCard(item));
        }
    };
};
class List extends Component<ListProps> {
    constructor(props:any) {
        super(props);
        this.handleRenameListButtonClicked = this.handleRenameListButtonClicked.bind(this);
    }
    state = {
        newCardInputValue: '',
        newListInputValue: '',
        addingCard: false,
        renameList: false,
        tempListValue: '',
        tempListIndex: -1,
        listObj: this.props.data
    }

    handleRenameListInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({tempListValue: event.target.value});
    }
    handleRenameListButtonClicked(){
        this.setState({
            renameList: true
        });
    }

    handleListRenamed(list: any, event: any) {
        event.preventDefault();
        const tempObj = this.state.listObj;
        tempObj.title = this.state.tempListValue;
        this.props.onRenameList(tempObj);
        this.setState({
            // listObj: tempObj,
            tempListValue: '',
            renameList: false
        });
    }

    handleNewCardInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({newCardInputValue: event.target.value});
    }

    handleNewCardCreated = (event: any) => {
        //event.preventDefault();
        const newCardObj = {id:(Math.random() * 12).toString(),text: this.state.newCardInputValue};

        const newCards = [...this.props.data.cards, newCardObj];
        const newList = {...this.props.data, cards: newCards};
        this.props.onCreateCard(newList);

        this.setState({
            // listObj: tempListObj,
            addingCard: false
        });
    }

    handleAddCardButtonClicked = () => {
        this.setState({
            addingCard: true
        })
    }

    handleMoveInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            tempListIndex: event.target.value
        })
    }

    handleMoveListButtonClicked(data: any, list: any) {
        this.props.onMoveList({
            currentList: data, 
            lists : list, 
            targetListIndex: this.state.tempListIndex
        });
    }

    render() {
        const cards = this.props.data.cards || [];
        return (<div style={{backgroundColor: '#c7c7c7', margin: '0.5em', borderRadius: '5px', padding: '2px', width: '200px'}}> 
           <header> 
               <h4 style={{margin:'0px', padding: '2px', display: 'inline'}}> {this.state.listObj.title} </h4> 
                {this.state.renameList ? (<form style={{margin: '0.5em', display: 'inline'}}  onSubmit={this.handleListRenamed.bind(this, this.props)}>
                   <input value={this.state.tempListValue} onChange={this.handleRenameListInputChanged.bind(this)} type="text" placeholder="Rename List" style={{border: 0, padding: '0.5em'}} />
                   <input type="submit" value="Rename List" />
                   </form>) : (<div style={{ display: 'inline'}}>
                    <img src={ Background } style= {{ display: 'inline', height: '15px', width: '15px',float: 'right'}}  onClick={this.handleRenameListButtonClicked}/>
                </div>)}
             
                    <input type="number"  placeholder="list index to move" onChange={this.handleMoveInputChanged.bind(this)}/>
                    <input type="button" value="Move List" onClick={this.handleMoveListButtonClicked.bind(this,this.props.data,this.props.lists)}/>
            </header>
            {
           cards.map((i, index) => (<div key={i.id}>
               <Card data={i} list={this.state.listObj}/>
               </div>))}

               {this.state.addingCard ? (<form style={{margin: '0.5em'}} >
                   <input value={this.state.newCardInputValue} onChange={this.handleNewCardInputChanged.bind(this)} type="text" placeholder="New card" style={{width: '90px'}} />
                   <input type="button" value="Add new card" onClick={this.handleNewCardCreated.bind(this)}/>
                   </form>) : (<div>
                   <button style={{width: '100%', textAlign:'center'}} onClick={this.handleAddCardButtonClicked}> Add Card </button>
                </div>)}
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)