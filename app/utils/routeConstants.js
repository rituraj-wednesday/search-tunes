export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  searchTunes: {
    route: '/searchTunes',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  trackInfo: {
    route: '/track/:trackId',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  }
};
