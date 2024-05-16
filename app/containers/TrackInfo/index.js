/**
 *
 * TrackInfo Container
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSomePayLoad } from './selectors';
import saga from './saga';

/**
 * TrackInfo container that handles the logic for displaying track detailed infor.
 * It includes detailed information of song, artist, genre, etc.
 * It also has an ability to Play Audio.
 *
 * @returns {JSX.Element} The SearchList TrackInfo container.
 */
export function TrackInfo(props) {
  return (
    <div>
      <T id={'TrackInfo'} />
    </div>
  );
}

TrackInfo.propTypes = {
  somePayLoad: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectSomePayLoad()
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch
//   };
// }

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo, injectSaga({ key: 'trackInfo', saga }))(TrackInfo);

export const TrackInfoTest = compose()(TrackInfo);
