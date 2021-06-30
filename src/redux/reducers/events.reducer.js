import { combineReducers } from 'redux';

// ⬇ eventsReducer:
const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End eventsReducer

// ⬇ eventsCategoriesReducer:
const eventsCategoriesReducer = (state = [{id: 1, name: "All"}], action) => {
  switch (action.type) {
    case 'SET_EVENT_CATEGORIES':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End eventsCategoriesReducer

// ⬇ eventsDetail Reducer:
const eventsDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_DETAIL':
      return action.payload;
    case 'CLEAR_DETAIL':
      return [];
    default:
      return state;
  } // End switch
} // End eventsDetail Reducer

// ⬇ eventsEdit Reducer:
const eventsEditReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_EDIT':
      return action.payload;
    case 'EVENT_EDIT_ONCHANGE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case 'CLEAR_EDIT':
      return [];
    default:
      return state;
  } // End switch
} // End eventsEdit Reducer


export default combineReducers({
  eventsReducer,
  eventsCategoriesReducer,
  eventsDetailReducer,
  eventsEditReducer
});
