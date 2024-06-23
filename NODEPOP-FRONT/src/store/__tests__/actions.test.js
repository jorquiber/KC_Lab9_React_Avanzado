import * as actions from '../actions';
import * as types from '../types';

describe('authLoginFulfilled sync action', () => {
  test('should return an "AUTH_LOGIN_FULFILLED" action', () => {
    const expectedAction = {
      type: types.AUTH_LOGIN_FULFILLED,
    };
    const action = actions.authLoginFulfilled();
    expect(action).toEqual(expectedAction);
  });
});


describe('loadAdverts async action', () => {

    beforeEach(() => {
        jest.clearAllMocks(); 
      });

    const mockAdverts = [{ id: 1, title: 'Advert 1' }, { id: 2, title: 'Advert 2' }];
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
        adverts: {
          loaded: false,
          data: [],
        },
      }));
    const services = {
        adverts: {
          getAdverts: jest.fn().mockResolvedValue(mockAdverts),
        },
      };

    const action = actions.loadAdverts();

  test('should dispatch ADVERTS_LOADED_FULFILLED when adverts are loaded', async () => {
    
    await action(dispatch, getState, { services });
    
    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.advertsLoadedPending());
    expect(services.adverts.getAdverts).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.advertsLoadedFulfilled(mockAdverts));
  });

  test('should dispatch ADVERTS_LOADED_REJECTED when there is an error getting adverts', async () => {
    const error = new Error('API error');
    services.adverts.getAdverts.mockRejectedValue(error);

    await action(dispatch, getState, { services });
    
    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, actions.advertsLoadedPending());
    expect(services.adverts.getAdverts).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, actions.advertsLoadedRejected(error));
  });
});