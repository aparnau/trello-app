interface IAction {
    type: string,
    payload: any
};
const initState = {
        boardName: 'Test Board',
        boardId: '01',
        lists: [{
            id: '0',
            title: 'List 1',
            cards: [{
                id: '0',
                text: 'List1 card 1',
            }, {
                id: '1',
                text: 'List1 card 2',
            }, {
                id: '2',
                text: 'List1 card 3',
            }]
        }, {
            id: '1',
            title: 'List 2',
            cards: [{
                id: '0',
                text: 'List2 card 1',
            }, {
                id: '1',
                text: 'List2 card 2',
            }, {
                id: '2',
                text: 'List2 card 3',
            }]
        }, {
            id: '2',
            title: 'List 3',
            cards: [{
                id: '0',
                text: 'List3 card 1',
            }, {
                id: '1',
                text: 'List3 card 2',
            }, {
                id: '2',
                text: 'List3 card 3',
            }]
        }],
};
const initialState = {
    board: initState
};
const trelloReducer = (state = initialState, action: IAction) => {
    switch(action.type){
        case 'RENAME_BOARD':
            const newBoardName = action.payload;
            const newState = JSON.parse(JSON.stringify(state))
            newState.board.boardName = newBoardName;

            return newState

        case 'RENAME_LIST':
            const oldLists = state.board.lists;
            const oldList = oldLists.filter(i => i.id === action.payload.id)[0];
            oldList.title = action.payload.title;

            const newLists = oldLists.map(i => i.id === action.payload.id ? oldList : i);

            return Object.assign({}, state, {
                lists: newLists
            });
        
        case 'CREATE_LIST':
            state.board.lists = action.payload;
            return state
            // return {
            //     ...state.board,
            //     lists: action.payload
            // };
        
        case 'MOVE_LIST':
            // console.log(action.payload)
            const currentList = action.payload.currentList;
            const fullLists: any [] = action.payload.lists;
            const currentListIndex = fullLists.findIndex(list => list.id === currentList.id);
            const targetListIndex = action.payload.targetListIndex;
            const otherItems = fullLists.filter(i => i.id != action.payload.currentList.id);
            const leftItems = otherItems.slice(0, action.payload.targetListIndex);
            const rightItems = otherItems.slice(action.payload.targetListIndex);
            const newListsItem = [...leftItems, currentList, ...rightItems];
            console.log(newListsItem)
            // fullLists.splice(currentListIndex, 1);
            // fullLists.splice(targetListIndex, 0, currentList)
            state.board.lists = newListsItem
            return {...state,
                board: {
                    ...state.board, lists: newListsItem
                }    
            }
        
        case 'CREATE_CARD':
            const newList = action.payload;
            const curLists = [...state.board.lists];
            let updatedList = curLists.map(list => {
                let returnValue = {...list};
                if (list.id === newList.id) {
                  returnValue.cards = newList.cards;
                }
                return returnValue
              })
            return {
                ...state,
                board: {...state.board, lists: updatedList}
            };

        case 'RENAME_CARD':
            const oldListsArr = state.board.lists;
            const oldListArr = oldListsArr.filter(i => i.id === action.payload.id)[0];
            oldListArr.title = action.payload.title;

            const newListsArr = oldListsArr.map(i => i.id === action.payload.id ? oldList : i);

            return Object.assign({}, state, {
                lists: newListsArr
            });
            
        case 'MOVE_CARD':
            // console.log(action.payload)
            const currentCard = action.payload.currentCard;
            const fullCards: any [] = action.payload.cards;
            const currentCardIndex = fullCards.findIndex(card => card.id === currentCard.id);
            const targetCardIndex = action.payload.targetCardIndex;
            const otherItemsVal = fullCards.filter(i => i.id != action.payload.currentCard.id);
            const leftItemsVal = otherItemsVal.slice(0, action.payload.targetCardIndex);
            const rightItemsVal = otherItemsVal.slice(action.payload.targetCardIndex);
            const newCardsItemVal = [...leftItemsVal, currentCard, ...rightItemsVal];
            const oldListsVal = [...state.board.lists];
            const currentListVal = action.payload.currentList

            let updatedListVal = oldListsVal.map(list => {
                let returnValue = {...list};
                if (list.id === currentListVal.id) {
                    returnValue.cards = newCardsItemVal;
                }
                return returnValue
                })

                return {
                ...state,
                board: {...state.board, lists: updatedListVal}
            };
            // state.board.lists = newListsItemVal;
           
    }
    return state;
};

export default trelloReducer;