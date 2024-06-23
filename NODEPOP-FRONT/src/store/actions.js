import * as types from './types';
import storage from '../utils/storage';
import { areAdvertsLoaded, areTagsLoaded, getAdvert } from './selectors';

export const authLoginPending = () => ({
  type: types.AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
  type: types.AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = error => ({
  type: types.AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

export const authLogin = (credentials, remember) => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials);
      if (!remember) {
        storage.remove('auth');
      }
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from || '/';
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginRejected(error));
    }
  };
};

export const authLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export const advertsLoadedPending = () => ({
  type: types.ADVERTS_LOADED_PENDING,
});

export const advertsLoadedFulfilled = adverts => ({
  type: types.ADVERTS_LOADED_FULFILLED,
  payload: adverts,
});

export const advertsLoadedRejected = error => ({
  type: types.ADVERTS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const loadAdverts = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areAdvertsLoaded(state)) {
      return;
    }
    try {
      dispatch(advertsLoadedPending());
      const adverts = await services.adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error) {
      dispatch(advertsLoadedRejected(error));
    }
  };
};


export const advertsDetailPending = () => ({
  type: types.ADVERTS_DETAIL_PENDING,
});

export const advertsDetailFulfilled = advert => ({
  type: types.ADVERTS_DETAIL_FULFILLED,
  payload: advert,
});

export const advertsDetailRejected = error => ({
  type: types.ADVERTS_DETAIL_REJECTED,
  payload: error,
  error: true,
});

export const loadAdvert = advertId => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }

    try {
      dispatch(advertsDetailPending());
      const advert = await services.adverts.getAdvert(advertId);
      dispatch(advertsDetailFulfilled(advert));
    } catch (error) {
      dispatch(advertsDetailRejected(error));
    }
  };
};


export const advertsCreatedPending = () => ({
  type: types.ADVERTS_CREATED_PENDING,
});

export const advertsCreatedFulfilled = advert => ({
  type: types.ADVERTS_CREATED_FULFILLED,
  payload: advert,
});

export const advertsCreatedRejected = error => ({
  type: types.ADVERTS_CREATED_REJECTED,
  payload: error,
  error: true,
});

export const createAdvert = advert => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertsCreatedPending());
      const { id } = await services.adverts.createAdvert(advert);
      const createdAdvert = await services.adverts.getAdvert(id);
      dispatch(advertsCreatedFulfilled(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertsCreatedRejected(error));
    }
  };
};

export const advertsDeletedPending = () => ({
  type: types.ADVERTS_DELETED_PENDING,
});

export const advertsDeletedFulfilled = advertId => ({
  type: types.ADVERTS_DELETED_FULFILLED,
  payload: advertId,
});

export const advertsDeletedRejected = error => ({
  type: types.ADVERTS_DELETED_REJECTED,
  payload: error,
  error: true,
});

export const deleteAdvert = advertId => {
  return async function (dispatch, _getState, { services, router }) {
    try {
      dispatch(advertsDeletedPending());
      await services.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled(advertId));
      router.navigate('/');
    } catch (error) {
      dispatch(advertsDeletedRejected(error));
    }
  };
}


export const tagsLoadedPending = () => ({
  type: types.TAGS_LOADED_PENDING,
});

export const tagsLoadedFulfilled = tags => ({
  type: types.TAGS_LOADED_FULFILLED,
  payload: tags,
});

export const tagsLoadedRejected = error => ({
  type: types.TAGS_LOADED_REJECTED,
  payload: error,
  error: true,
});

export const loadTags = () => {
  return async function (dispatch, getState, { services }) {
    const state = getState();
    if (areTagsLoaded(state)) {
      return;
    }
    try {
      dispatch(tagsLoadedPending());
      const tags = await services.adverts.getAdvertTags();
      dispatch(tagsLoadedFulfilled(tags));
    } catch (error) {
      dispatch(tagsLoadedRejected(error));
    }
  };
};

export const uiResetError = () => ({
  type: types.UI_RESET_ERROR,
});
