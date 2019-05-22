export const renameBoard = (item: any) => {
    return {
        type: 'RENAME_BOARD',
        payload: item
    };
};

export const editList = (item: any) => {
    return {
        type: 'RENAME_LIST',
        payload: item
    }
}

export const createList = (item: any) => {
    return {
        type: 'CREATE_LIST',
        payload: item
    }
}

export const moveList = (item: any) => {
    return {
        type: 'MOVE_LIST',
        payload: item
    }
}

export const editCard = (item: any) => {
    return {
        type: 'RENAME_CARD',
        payload: item
    }
}

export const createCard = (item: any) => {
    return {
        type: 'CREATE_CARD',
        payload: item
    }
}

export const moveCard = (item: any) => {
    return {
        type: 'MOVE_CARD',
        payload: item
    }
}

