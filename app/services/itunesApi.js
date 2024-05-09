import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getSearchedList = (keyword) => itunesApi.get(`/search?term=${keyword}`);
