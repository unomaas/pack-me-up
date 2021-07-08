import { combineReducers } from 'redux';

const eventsKitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTS_KITS':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End eventsKitsReducer



export default eventsKitsReducer;