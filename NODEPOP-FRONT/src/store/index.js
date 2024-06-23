import { combineReducers, createStore, applyMiddleware } from 'redux';
import {withExtraArgument} from 'redux-thunk';
import * as reducers from './reducers';
import * as auth from '../pages/auth/service';
import * as adverts from '../pages/adverts/service';
import { failureRedirects } from './middleware';

const rootReducer = combineReducers(reducers);

console.log('auth', auth);
console.log('adverts', adverts);

export default function configureStore(preloadedState = {}, { router }) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(withExtraArgument({ services: { auth, adverts }, router }), 
      failureRedirects(router, {
      401: '/login',
      404: '/404',
    }),));

  return store;
}

