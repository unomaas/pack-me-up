import { combineReducers } from 'redux';

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End eventsReducer

const eventsCategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_CATEGORIES':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End eventsCategoriesReducer

export default combineReducers({
  eventsReducer,
  eventsCategoriesReducer,
});
