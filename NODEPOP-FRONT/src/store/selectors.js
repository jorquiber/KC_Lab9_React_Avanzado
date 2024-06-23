export const getIsLogged = state => state.auth;

export const areAdvertsLoaded = state => state.adverts.loaded;
export const getAdverts = state => state.adverts.data;

export const areTagsLoaded = state => state.tags.loaded;
export const getTags = state => state.tags.data;

export const getAdvert = advertId => state =>
  getAdverts(state).find(advert => advert.id === advertId);

export const getUi = state => state.ui;
