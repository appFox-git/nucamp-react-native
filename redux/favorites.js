import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            //check if item is already included in the favorites array
            if (state.includes(action.payload)) {
                return state;
            }
            // add item to the favorite array
            return state.concat(action.payload);
            
        default:
            return state;
    }
};