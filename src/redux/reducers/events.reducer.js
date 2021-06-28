const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      return action.payload;
    default:
      return state;
  } // End switch
}; // End eventsReducer

export default eventsReducer;
