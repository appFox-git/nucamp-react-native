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

    // use filter() to return a new 'favorite' array, including all
    // favorite campsiteId's minus the one that the user has
    // selected to delete.
    case ActionTypes.DELETE_FAVORITE:
      return state.filter(favorite => favorite !== action.payload);

    default:
      return state;
  }
};
