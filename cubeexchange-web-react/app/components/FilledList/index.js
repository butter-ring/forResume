/**
 *
 * FilledList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function FilledList() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

FilledList.propTypes = {};

export default FilledList;
