import * as actions from '../actions';
import * as types from '../types';

describe('authLoginFulfilled sync action', () => {
  it('should return an "AUTH_LOGIN_FULFILLED" action', () => {
    const expectedAction = {
      type: types.AUTH_LOGIN_FULFILLED,
    };
    const action = actions.authLoginFulfilled();
    expect(action).toEqual(expectedAction);
  });
});