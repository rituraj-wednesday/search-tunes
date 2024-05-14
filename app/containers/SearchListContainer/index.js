/**
 *
 * SearchListContainer Container
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty, get } from 'lodash';
import styled from '@emotion/styled';
import { Card, IconButton, InputAdornment, OutlinedInput, CardHeader, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { connect } from 'react-redux';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import saga from './saga';
import { translate } from '@app/utils';
import { selectError, selectLoading, selectTerm, selectTrackList } from './selectors';
import { searchListContainerCreators } from './reducer';
import { If } from '@app/components/If';
import { For } from '@app/components/For/index';
import { Track } from '@app/components/Track/index';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const CustomCardHeader = styled(CardHeader)`
  && {
    padding: 0;
  }
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;
const Container = styled.div`
  && {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Each column is a minimum of 60px */
    grid-gap: 8px;
  }
`;

const renderTrackList = (trackList, loading) => {
  const resultCount = get(trackList, 'resultCount', 0);
  const results = get(trackList, 'results', []);
  return (
    <If condition={resultCount && !loading}>
      <CustomCard>
        <For of={results} ParentComponent={Container} renderItem={(track) => <Track track={track} />} />
      </CustomCard>
    </If>
  );
};

/**
 * SearchListContainer component that handles the logic for searching and displaying tunes.
 * It includes input handling, loading state management, and rendering of the tunes list or error state.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.maxwidth - The maximum width of the component.
 * @param {Function} props.dispatchSearchList - Dispatch Action for Search Term change.
 * @param {Function} props.dispatchClearList - Dispatch Action for Search Term cleared.
 * @returns {JSX.Element} The SearchList component.
 */
export function SearchListContainer({ maxwidth, dispatchSearchList, dispatchClearList, trackList, term }) {
  const searchTunes = (newTerm) => {
    dispatchSearchList(newTerm);
  };

  const handleOnChange = (newTerm) => {
    if (!isEmpty(newTerm)) {
      searchTunes(newTerm);
    } else {
      dispatchClearList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 700);

  return (
    <div>
      <CustomCard maxwidth={maxwidth}>
        <CustomCardHeader title={translate('search_tunes')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T marginBottom={10} id="search_song_detail" />
        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          onChange={(event) => debouncedHandleOnChange(event.target.value)}
          fullWidth
          defaultValue={term}
          placeholder={translate('tunes_search_placeholder')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-icon"
                aria-label="search tunes"
                type="button"
                onClick={() => searchTunes(term)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
      {renderTrackList(trackList)}
    </div>
  );
}

SearchListContainer.propTypes = {
  somePayLoad: PropTypes.any,
  maxwidth: PropTypes.number,
  dispatchSearchList: PropTypes.func,
  dispatchClearList: PropTypes.func,
  trackList: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  term: PropTypes.string
};

SearchListContainer.defaultProps = {
  maxWidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  term: selectTerm(),
  loading: selectLoading(),
  trackList: selectTrackList(),
  error: selectError()
});

// eslint-disable-next-line require-jsdoc
function mapDispatchToProps(dispatch) {
  const { requestGetSearchedTunes, clearSearchList } = searchListContainerCreators;
  return {
    dispatchSearchList: (term) => dispatch(requestGetSearchedTunes(term)),
    dispatchClearList: () => dispatch(clearSearchList())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'searchListContainer', saga }))(SearchListContainer);

export const SearchListContainerTest = compose()(SearchListContainer);
