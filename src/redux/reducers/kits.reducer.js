import { combineReducers } from 'redux';

// ⬇ kitsReducer:
const kitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_KITS':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End kitsReducer

// ⬇ kitsCategoriesReducer:
const kitsCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KIT_CATEGORIES':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End kitsCategoriesReducer

// ⬇ kitsDetail Reducer:
const kitsDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KIT_DETAIL':
      return action.payload;
    case 'CLEAR_DETAIL':
      return [];
    default:
      return state;
  } // End switch
} // End kitsDetail Reducer

// ⬇ kitsEdit Reducer:
const kitsEditReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_KIT_EDIT':
      return action.payload;
    case 'KIT_EDIT_ONCHANGE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case 'CLEAR_EDIT':
      return [];
    default:
      return state;
  } // End switch
} // End kitsEdit Reducer


export default combineReducers({
  kitsReducer,
  kitsCategoriesReducer,
  kitsDetailReducer,
  kitsEditReducer
});
