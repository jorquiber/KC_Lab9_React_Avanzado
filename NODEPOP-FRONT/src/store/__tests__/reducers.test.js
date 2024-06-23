import * as reducers from '../reducers';
import * as types from '../types';

describe('adverts reducer', () => {
  test('should handle ADVERTS_LOADED_FULFILLED', () => {
    const initialState = { loaded: false, data: [] };
    const mockAdverts = [{ id: 1, title: 'Advert 1' }, { id: 2, title: 'Advert 2' }];
    const action = { type: types.ADVERTS_LOADED_FULFILLED, payload: mockAdverts };
    const expectedState = { loaded: true, data: mockAdverts };
    expect(reducers.adverts(initialState, action)).toEqual(expectedState);
  });

  test('should return the initial state for unknown action', () => {
    const initialState = { loaded: false, data: [] };
    const action = { type: 'UNKNOWN_ACTION' };
    expect(reducers.adverts(initialState, action)).toEqual(initialState);
  });
});