/**
 *
 * EditorImageUploadPop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: '#f1f1f1',
    padding: theme.spacing(0),
    // maxWidth: 300,
    width: '100%',
  },
  inputLink: {
    // backgroundColor: '#f1f1f1',
    padding: theme.spacing(1),
    // maxWidth: 550,
    width: '100%',
  },
}));
function EditorImageUploadPop({ handleClose }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogTitle id="alert-dialog-title">
        {'이미지 링크를 입력해 주세요'}
      </DialogTitle>
      <DialogContent>
        <input
          type="text"
          className={classes.input}
          maxLength="200"
          max="200"
          placeholder="https://"
          onClick={handleClose}
        />
      </DialogContent>
    </div>
  );
}

EditorImageUploadPop.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default EditorImageUploadPop;
