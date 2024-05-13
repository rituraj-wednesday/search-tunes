import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import SearchListContainer from '@app/containers/SearchListContainer/loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  searchTerm: {
    component: SearchListContainer,
    ...routeConstants.searchTerm
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
