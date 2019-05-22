import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { editCard, moveCard } from '../actions/trello';
import Background from '../assets/download.png';
import List, {ListData}  from './List'

export interface CardData {
    id: string,
    text: string
}

interface CardProps {
    data: CardData,
    list: ListData,
    onMoveCard: any,
    onRenameCard: any,
    cards : any
}

const mapStateToProps = (state: any) => {
    return {
        cards: state.trello.board.lists
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onMoveCard: (item: any,) => {
            dispatch(moveCard(item));
        },
        onRenameCard: (item: any) => {
            dispatch(editCard(item));
        },
    };
};

class Card extends Component<CardProps> {
    constructor(props:any) {
        super(props);
    }
    state = {
        newCardInputValue: '',
        renameCard: false,
        cardObj: this.props.data,
        listObj: this.props.list,
        tempCardValue: '',
        tempCardIndex : -1
    }

    handleRenameCardtInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            tempCardValue: event.target.value
        });
    }
    handleRenameCardButtonClicked(){
        this.setState({
            renameCard: true
        })
    }

    handleCardRenamed(card: any, event: any) {
        event.preventDefault();
        const tempCardObj = this.state.cardObj;
        tempCardObj.text = this.state.tempCardValue;
        this.props.onRenameCard(tempCardObj);
        this.setState({
            // cardObj: tempCardObj,
            tempCardValue: '',
            renameCard: false
        });
    }


    handleMoveInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            tempCardIndex: event.target.value
        })
    }

    handleMoveCardButtonClicked(data: any) {
        const currentList = this.state.listObj;
        this.props.onMoveCard({
            currentCard: data, 
            cards : currentList.cards,
            currentList: currentList, 
            targetCardIndex: this.state.tempCardIndex
        });
    }

    render() {
        return (<div style={{backgroundColor: 'white', padding: '4px', margin: '5px',borderRadius: '5px',position: 'relative'}}> 
            <h4 style={{display: 'inline'}}> {this.state.cardObj.text} </h4>
                <input type="number"  style={{width: '100px', fontSize: '9px' }} placeholder="card index to move" onChange={this.handleMoveInputChanged.bind(this)}/>
                <input type="button" value="Move Card" onClick={this.handleMoveCardButtonClicked.bind(this,this.props.data)}/>
        
            {this.state.renameCard ? (<form style={{display: 'inline'}} onSubmit={this.handleCardRenamed.bind(this, this.props)}>
                <input value={this.state.tempCardValue} onChange={this.handleRenameCardtInputChanged.bind(this)} type="text" placeholder="Rename Card" style={{width: '85px', fontSize: '9px'}} />
                <input type="submit" value="Rename Card"/>
                </form>) : (<div style={{ display: 'inline', position: 'absolute', top: '2px', right: '5px'}}>
                <img src={ Background } style= {{ display: 'inline', height: '15px', width: '15px',float: 'right'}}  onClick={this.handleRenameCardButtonClicked.bind(this)}/>
            </div>)}
        </div>    
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)