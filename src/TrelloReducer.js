function Trello(currentState, action) {
    switch (action.type) {
        case 'EDIT_BOARD_NAME':
            return editBoardReducer(currentState, action);
        case 'ADD_LIST':
            return addListReducer(currentState, action);
        case 'EDIT_LIST':
            return editListReducer(currentState, action);
        case 'MOVE_LIST':
            return moveListReducer(currentState, action);
        case 'ADD_CARD':
            return addCardReducer(currentState, action);
        case 'EDIT_CARD':
            return editCardReducer(currentState, action);
        case 'MOVE_CARD':
            return moveCardReducer(currentState, action);
        default:
            return currentState;
    }
}

let currentState = {
    board: {
        id: "5612e4f91b25c15e873722b8",
        name: "Employee Manual",
        lists: [{
            id: "560bf446f17023a3710658fb",
            name: "Alaska",
            closed: false,
            pos: 65535,
            idBoard: "5612e4f91b25c15e873722b8",
            cards: [{
                    cardid: '1122',
                    cardname: "card 1"
                },
                {
                    cardid: '1212',
                    cardname: "card 2"
                },
                {
                    cardid: '122',
                    cardname: "blaah"
                }
            ],
        }],
    },
};

const states = [];

function editBoardReducer(currentState, action) {
    if (action.type === 'EDIT_BOARD_NAME') {
        const oldBoards = currentState.board;

        const oldBoard = oldBoards.filter(i => i.id === action.payload.id);
        oldBoard.name = action.payload.name;
        // const newBoards = oldBoards.map(i => i.id === action.payload.id ? oldBoards : i);

        newState.board.name = oldBoard.name;
        return newState
    } else {
        return currentState;
    }
}

function addListReducer(currentState, action) {
    if (action.type === 'ADD_LIST') {
        const oldLists = currentState.board;
        currentState.board.lists.push({
            id: Math.random() * 3543 + '',
            name: 'test'
        });
        // console.log('****', currentState.board.lists)
        return currentState;
    } else {
        return currentState;
    }
}

function editListReducer(currentState, action) {
    if (action.type === 'EDIT_LIST') {
        const oldLists = currentState.board.lists;
        const oldList = oldLists.filter(i => i.id === action.payload.id)[0];
        oldList.name = action.payload.name;

        const newLists = oldLists.map(i => i.id === action.payload.id ? oldLists : i);

        return Object.assign({}, currentState, {
            board: newLists
        });

    } else {
        return currentState;
    }
}

function moveListReducer(currentState, action) {
    if (action.type === 'MOVE_LIST') {
        const oldLists = currentState.board.lists;
        const list = oldLists.filter(i => i.id === action.payload.id);
        const otherItems = oldLists.filter(i => i.id != action.payload.id);
        const leftItems = otherItems.slice(0, action.payload.index);
        const rightItems = otherItems.slice(action.payload.index + 1);
        const newLists = [...leftItems, list[0], ...rightItems];
        // console.log('****', newLists);
        newState.board.lists = newLists;

        return newState;
    } else {
        return currentState;
    }
}

function addCardReducer(currentState, action) {
    if (action.type === 'ADD_CARD') {
        const oldList = currentState.board.lists;
        const targetListItem = oldList.filter((i) => i.id === action.payload.id);

        const newCards = [targetListItem[0].cards, {
            cardid: Math.random() * 352,
            cardname: action.payload.cardname
        }];

        const newListItem = Object.assign({}, targetListItem, {
            cards: newCards
        });
        const newList = oldList.map((i) => i.id === action.payload.id ? newListItem : i);

        const newBoard = Object.assign({}, currentState.board, {
            lists: newList
        });

        return Object.assign({}, currentState, {
            board: newBoard
        });
    } else {
        return currentState;
    }
}

function editCardReducer(currentState, action) {
    if (action.type === 'EDIT_CARD') {
        const oldList = currentState.board.lists;

        const targetList = oldList.filter((i) => i.id === action.payload.id);
        const targetCard = targetList[0].cards.filter((i) => i.cardid === action.payload.cardid);
        const newCard = Object.assign({}, targetCard, {
            cardname: action.payload.cardname
        });

        const newCards = targetList[0].cards.map((i) => i.cardid == action.payload.cardid ? newCard : i);
        const newListItem = Object.assign({}, targetList, {
            cards: newCards
        });
        const newList = oldList.map((i) => i.id === action.payload.id ? newListItem : i);
        const newBoard = Object.assign({}, currentState.board, {
            lists: newList
        });

        return Object.assign({}, currentState, {
            board: newBoard
        });
    } else {
        return currentState;
    }
}

function moveCardReducer(currentState, action) {
    if (action.type === 'MOVE_CARD') {
        const newState = JSON.parse(JSON.stringify(currentState));
        const oldCards = newState.board.lists[0].cards;
        const card = oldCards.filter(i => i.cardid === action.payload.cardid);
        const otherItems = oldCards.filter(i => i.cardid != action.payload.cardid);
        const leftItems = otherItems.slice(0, action.payload.index);
        const rightItems = otherItems.slice(action.payload.index + 1);
        const newCards = [...leftItems, card[0], ...rightItems];
        // console.log('oldCards', oldCards);
        // console.log('newCards', newCards);
        newState.board.lists[0].cards = newCards;

        return newState;
    } else {
        return currentState;
    }
}

const newState = addListReducer(currentState, {
    type: 'EDIT_BOARD_NAME'
});
// console.log('newState***', newState.board.lists);

export default Trello;