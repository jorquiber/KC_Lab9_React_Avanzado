import { client } from '../../api/client';

const advertsURL = '/api/v1/adverts';

export const getAdverts = () => {
  const url = advertsURL;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsURL}/${advertId}`;
  return client.get(url);
};

export const createAdvert = (advertFormData) => {
  return client.post(advertsURL, advertFormData);
};

export const getAdvertTags = () => {
  const url = `${advertsURL}/tags`;
  return client.get(url);
}

export const deleteAdvert = advertId => {
  return client.delete(`${advertsURL}/${advertId}`);
};
