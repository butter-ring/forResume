/**
 *
 * TokenList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TokenList() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TokenList.propTypes = {};

export default TokenList;
