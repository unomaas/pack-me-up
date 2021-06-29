const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_ITEMS':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End itemsReducer


export default itemsReducer;
