import Trello from './TrelloReducer';
const chai = require('chai');

chai.should();
describe('Trello', function () {
    it('should edit board name', function () {
        const currentState = {
            board: [{
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
                        cardname: "card 1"                },
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
            }],
            currentView: 'DashboardView'
        };
        const action = {
            type: 'EDIT_BOARD_NAME',
            payload: {
                id: '5612e4f91b25c15e873722b8',
                name: 'Board renamed',
            }
        };

        const newState = Trello(currentState, action);
        console.log('currentState', currentState.board);
        console.log('newState', newState.board);
        // newState.board.should.be.instanceOf(Array);
    });

    it('should add list', function () {
        const currentState = {
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
                        cardname: "card 1"                },
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
            currentView: 'DashboardView'
        };
        const action = {
            type: 'ADD_LIST',
            payload: {
                name: 'item 3',
                id: '2342343',
            }
        };

        const newState = Trello(currentState, action);
        // console.log('currentState', currentState);
        // console.log('newState', newState.board.lists);
        newState.board.lists.should.be.instanceOf(Array);
    });
    it('should edit list', function () {
        const currentState = {
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
                        cardname: "card 1"                },
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
            currentView: 'DashboardView'
        };
        const action = {
            type: 'EDIT_LIST',
            payload: {
                id: '560bf446f17023a3710658fb',
                name: 'list 3',
            }
        };

        const newState = Trello(currentState, action);
        // console.log('currentState', currentState);
        // console.log('newState', newState.board);
        newState.board.should.be.instanceOf(Array);
    });
    it('should move a List', function () {
        const currentState = {
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
                            cardname: "card 1"                },
                        {
                            cardid: '1212',
                            cardname: "card 2"
                        },
                        {
                            cardid: '122',
                            cardname: "blaah"
                        }
                    ],
                    },
                    {
                        id: "324324ddsf",
                        name: "Blaaah",
                        closed: false,
                        pos: 65535,
                        idBoard: "5612e4f91b25c15e873722b8",
                        cards: [{
                            openPerBoard: {
                                id: "2323dsf",
                                status: "ok",
                                pos: 2323,
                            },
                            totalPerBoard: {
                                id: "32432ddf",
                                status: "ok",
                                pos: 6565,
                            }
                        }],
                    }
                ],
            },
            currentView: 'DashboardView'
        };
        const action = {
            type: 'MOVE_LIST',
            payload: {
                id: '5612e4f91b25c15e873722b8',
            }
        };

        const newState = Trello(currentState, action);
        // console.log('currentState1', currentState.board.lists);
        // console.log('newState1', newState.board.lists);
        // newState.items.should.be.instanceOf(Array);
    });

    it('should add card', function () {
        const currentState = {
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
                        cardname: "card 1"                },
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
            currentView: 'DashboardView'
        };
        const action = {
            type: 'ADD_CARD',
            payload: {
                'id': '560bf446f17023a3710658fb',
                'cardname': 'New Card'
            }
        };

        const newState = Trello(currentState, action);
        // console.log('currentState', currentState.board.lists[0].cards);
        // console.log('newState', newState.board.lists[0].cards);
        newState.board.lists.should.be.instanceOf(Array);
    });
    it('should edit card', function() {
        const currentState = {
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
                        cardname: "card 1"                },
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
            currentView: 'DashboardView'
        };
        const action = {
            type: 'EDIT_CARD',
            payload: {
                'id': '560bf446f17023a3710658fb',
                'cardid': '462957',
                'cardname': 'Card new name'
            }
        };

        const newState=Trello(currentState, action);
        // console.log('currentState', currentState.board.lists[0].cards);
        // console.log('newState', newState.board.lists[0].cards);
        // newState.board.should.be.instanceOf(Array);
    });
    it('should move a card', function () {
        const currentState = {
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
                        cardname: "card 1"                },
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
            currentView: 'DashboardView'
        };
        const action = {
            type: 'MOVE_CARD',
            payload: {
                'id': '560bf446f17023a3710658fb',
                'cardid': '392035',
                'index': 2
            }
        };

        const newState = Trello(currentState, action);
        // console.log('currentState', currentState.board.lists[0].cards);
        // console.log('newState', newState.board.lists[0].cards);
        // newState.items.should.be.instanceOf(Array);
    });
});