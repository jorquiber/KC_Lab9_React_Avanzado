import * as types from './types';

export const defaultState = {
  auth: false,
  adverts: {
    loaded: false,
    data: [],
  },
  tags: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case types.AUTH_LOGIN_FULFILLED:
      return true;
    case types.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case types.ADVERTS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    case types.ADVERTS_CREATED_FULFILLED:
      return { ...state, data: [...state.data, action.payload] };
    case types.ADVERTS_DETAIL_FULFILLED:
      return { ...state, data: [action.payload] };
    case types.ADVERTS_DELETED_FULFILLED:
      return { ...state, data: state.data.filter((advert) => advert.id !== action.payload) };
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case types.TAGS_LOADED_FULFILLED:
      return { ...state, loaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }

  if (action.type === types.UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type.endsWith('/pending')) {
    return { ...state, pending: true };
  }

  if (action.type.endsWith('/fulfilled')) {
    return { ...state, pending: false, error: null };
  }

  return state;
}


