import {ADD_NEW_DECK} from '../actions/index'

const decks = (state=[],action) => {
    switch (action.type) {
        case ADD_NEW_DECK:
            return {
                ...state,
                ...action.deck
            }

        default:
            return state

    }
        
}

export default decks