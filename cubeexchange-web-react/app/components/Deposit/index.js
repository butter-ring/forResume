/**
 *
 * Deposit
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Deposit() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Deposit.propTypes = {};

export default memo(Deposit);
