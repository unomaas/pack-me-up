const kitsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_KITS':
      return action.payload;      
    default:
      return state;
  } // End switch
}; // End kitsReducer

export default kitsReducer;
