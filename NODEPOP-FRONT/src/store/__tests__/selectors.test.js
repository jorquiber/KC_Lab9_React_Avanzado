import * as selectors from '../selectors';

describe('getAdvert selector', () => {
  test('should return the advert with the given advertId', () => {
    const state = {
      adverts: {
        data: [
          { id: 1, title: 'Advert 1' },
          { id: 2, title: 'Advert 2' },
          { id: 3, title: 'Advert 3' },
        ],
      },
    };
    const advertId = 2;
    const selectedAdvert = selectors.getAdvert(advertId)(state);
    expect(selectedAdvert).toEqual({ id: 2, title: 'Advert 2' });
  });
});