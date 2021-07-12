import userReducer from "./user.reducer";

// Test SET_USER
// Test UNSET_USER
// Test other action
// Test initial value

describe('USER REDUCER TESTS', () => {

  test('SET_USER', () => {
    const action = { type: 'SET_USER', payload: { id: 1 } };
    const state = {};
    expect(userReducer(state, action)).toEqual({ id: 1 });
  })

  test('UNSET_USER', () => {
    const action = { type: 'UNSET_USER' };
    const state = { id: 1 };
    expect(userReducer(state, action)).toEqual({});
  })

})