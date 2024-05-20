import MockAdapter from 'axios-mock-adapter';
import { API_TYPES, getApiClient } from '@utils/apiUtils';
import { getSearchedList, getTrackInfo } from '../itunesApi';

describe('ITunes API tests', () => {
  const term = 'jack+johnson';
  const trackId = 1;
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient(API_TYPES.ITUNES).axiosInstance);
    const data = {
      resultCount: 1,
      results: [{
        trackId: 1,
        trackName: 'Song'
      }]
    };
    mock.onGet(`/search?term=${term}`).reply(200, data);
    const res = await getSearchedList(term);
    expect(res.data).toEqual(data);
  });
  it('should make the api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient(API_TYPES.ITUNES).axiosInstance);
    const data = {
      resultCount: 1,
      results: [{
        trackId,
        trackName: 'Song'
      }]
    };
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getTrackInfo(trackId);
    expect(res.data).toEqual(data);
  });
});
