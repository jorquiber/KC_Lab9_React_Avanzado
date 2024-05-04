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
