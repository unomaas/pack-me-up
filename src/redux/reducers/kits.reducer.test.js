
import { kitsReducer } from './kits.reducer';

describe('KITS REDUCER TESTS', () => {

  test('SET_ALL_KITS', () => {
    const state = [];
    const action = { type: 'SET_ALL_KITS', payload: { id: 1 } }
    expect(kitsReducer(state, action)).toEqual({ id: 1 })
  })

})