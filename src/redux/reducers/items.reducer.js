import { combineReducers } from 'redux';

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ITEMS':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End itemsReducer

// ⬇ itemsEditReducer:
const itemsEditReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEM_EDIT':
      return action.payload;
    case 'ITEM_EDIT_ONCHANGE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case 'CLEAR_EDIT':
      return [];
    default:
      return state;
  } // End switch
} // End itemsEditReducer 


export default combineReducers({
  itemsReducer,
  itemsEditReducer
});