/**
 *
 * TrackInfo Container
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import { connect } from 'react-redux';
import { compose } from 'redux';

/**
 * TrackInfo container that handles the logic for displaying track detailed infor.
 * It includes detailed information of song, artist, genre, etc.
 * It also has an ability to Play Audio.
 *
 * @returns {JSX.Element} The SearchList TrackInfo container.
 */
export function TrackInfo() {
  return (
    <div>
      <T id={'TrackInfo'} />
    </div>
  );
}

TrackInfo.propTypes = {
  somePayLoad: PropTypes.any
};

const withConnect = connect(null, null);

export default compose(withConnect, memo)(TrackInfo);

export const TrackInfoTest = compose()(TrackInfo);
