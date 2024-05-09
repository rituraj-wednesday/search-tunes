/**
 *
 * SearchListContainer Container
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Card, IconButton, InputAdornment, OutlinedInput, CardHeader, Divider } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { connect } from 'react-redux';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSomePayLoad } from './selectors';
import saga from './saga';
import { translate } from '@app/utils';

const CustomCard = styled(Card)`
  && {
    margin: 1.25rem 0;
    padding: 1rem;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
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

/**
 * SearchListContainer component that handles the logic for searching and displaying tunes.
 * It includes input handling, loading state management, and rendering of the tunes list or error state.
 *
 * @date 09/05/2024 - 16:37:00
 *
 * @param {Object} props - The component props.
 * @param {string} props.maxwidth - The maximum width of the component.
 * @returns {JSX.Element} The HomeContainer component.
 */
export function SearchListContainer({ maxwidth }) {
  return (
    <div>
      <CustomCard maxwidth={maxwidth}>
        <CustomCardHeader title={translate('search_tunes')} />
        <Divider sx={{ mb: 1.25 }} light />
        <T marginBottom={10} id="search_song_detail" />
        <StyledOutlinedInput
          inputProps={{ 'data-testid': 'search-bar' }}
          // onChange={(event) => debouncedHandleOnChange(event.target.value)}
          onChange={() => {}}
          fullWidth
          defaultValue={''}
          placeholder={translate('tunes_search_placeholder')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton data-testid="search-icon" aria-label="search tunes" type="button" onClick={() => {}}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </CustomCard>
    </div>
  );
}

SearchListContainer.propTypes = {
  somePayLoad: PropTypes.any,
  maxwidth: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectSomePayLoad()
});

// eslint-disable-next-line require-jsdoc
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'searchListContainer', saga }))(SearchListContainer);

export const SearchListContainerTest = compose()(SearchListContainer);
