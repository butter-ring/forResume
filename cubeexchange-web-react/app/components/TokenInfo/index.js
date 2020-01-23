/**
 *
 * TokenInfo
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    display: 'flex',
    width: '100%',
    border: '1px solid #4f545f',
  },
}));
function TokenInfo() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

TokenInfo.propTypes = {};

export default TokenInfo;
