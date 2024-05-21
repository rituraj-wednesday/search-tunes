import { API_TYPES, generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient(API_TYPES.ITUNES);

export const getSearchedList = (keyword) => itunesApi.get(`/search?term=${keyword}`);
export const getTrackInfo = (trackId) => itunesApi.get(`/lookup?id=${trackId}`);
