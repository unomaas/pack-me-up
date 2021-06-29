import { combineReducers } from 'redux';

const kitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_KITS':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End kitsReducer

const kitsCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KIT_CATEGORIES':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End kitsCategoriesReducer

export default combineReducers({
  kitsReducer,
  kitsCategoriesReducer,
});
