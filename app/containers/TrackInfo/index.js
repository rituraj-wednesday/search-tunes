/**
 *
 * TrackInfo Container
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { trackReduxCreators } from '../TrackReduxProvider/reducer';
import { selectTrackInfo } from '../TrackReduxProvider/selectors';
import { trackInfoContainerSaga } from '../TrackReduxProvider/saga';

/**
 * TrackInfo container that handles the logic for displaying track detailed infor.
 * It includes detailed information of song, artist, genre, etc.
 * It also has an ability to Play Audio.
 *
 * @returns {JSX.Element} The SearchList TrackInfo container.
 */
export function TrackInfo(props) {
  const { match, dispatchTrackID } = props;
  const {
    params: { trackId }
  } = match;
  useEffect(() => {
    if (!trackId) {
      dispatchTrackID(trackId);
    }
  }, [trackId]);
  return (
    <div>
      <T id={'TrackInfo'} />
    </div>
  );
}

TrackInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  trackInfo: PropTypes.shape({
    resultCount: PropTypes.number
  }),
  dispatchTrackID: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  trackInfo: selectTrackInfo()
});

// eslint-disable-next-line require-jsdoc
function mapDispatchToProps(dispatch) {
  const { requestGetTrackInfo } = trackReduxCreators;
  return {
    dispatchTrackID: (trackId) => dispatch(requestGetTrackInfo(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'trackReduxProvider', saga: trackInfoContainerSaga })
)(TrackInfo);

export const TrackInfoTest = compose()(TrackInfo);
