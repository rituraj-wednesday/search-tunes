import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import SearchListContainer from '@app/containers/SearchListContainer/loadable';
import TrackInfo from '@app/containers/TrackInfo/loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  searchTunes: {
    component: SearchListContainer,
    ...routeConstants.searchTunes
  },
  trackInfo: {
    component: TrackInfo,
    ...routeConstants.trackInfo
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
