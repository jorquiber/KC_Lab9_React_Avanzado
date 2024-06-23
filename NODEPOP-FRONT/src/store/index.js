import { combineReducers, createStore, applyMiddleware } from 'redux';
import {withExtraArgument} from 'redux-thunk';
import * as reducers from './reducers';
import * as auth from '../pages/auth/service';
import * as adverts from '../pages/adverts/service';
import { failureRedirects } from './middleware';
import { composeWithDevTools, actionCreators } from 'redux-devtools-extension';

const rootReducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(preloadedState = {}, { router }) {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(withExtraArgument({ services: { auth, adverts }, router }), 
      failureRedirects(router, {
      401: '/login',
      404: '/404',
    }))));

  return store;
}

