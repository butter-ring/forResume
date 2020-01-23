/**
 *
 * ErrorPop
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { FormattedMessage } from 'react-intl';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import messages from './messages';

function ErrorPop({ handleClose, openError, errorTitle }) {
  return (
    <Dialog
      open={openError.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {errorTitle && errorTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {openError.errorCode.code && (
            <FormattedMessage {...messages[openError.errorCode.code]} />
          )}
          {/* <FormattedMessage {...messages['idpasswordEmpty']} /> */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ErrorPop.propTypes = {
  handleClose: PropTypes.func.isRequired,
  openError: PropTypes.object.isRequired,
  errorTitle: PropTypes.string,
};

export default memo(ErrorPop);
