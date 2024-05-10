import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSearchedList } from '../itunesApi';

describe('ITunes API tests', () => {
  const term = 'jack+johnson';
  it('should make the api call to "/search?term="', async () => {
    // const mock = new MockAdapter(getApiClient().axiosInstance);
    // const data = [
    //   {
    //     totalCount: 1,
    //     items: [{ repositoryName }]
    //   }
    // ];
    // mock.onGet(`/search?term=${term}`).reply(200, data);
    // const res = await getSearchedList(term);
    // console.log(res);
    // expect(res.data).toEqual(data);
  });
});
