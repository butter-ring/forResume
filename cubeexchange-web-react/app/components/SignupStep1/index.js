/**
 *
 * SignupStep1
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Agree1 from './agree1';
import Agree2 from './agree2';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingTop: 20,
    paddingBottom: 6,
    marginBottom: 14,
  },
  content: {
    backgroundColor: '#ffffff',
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 20,
    paddingBottom: 23,
  },
  contentSecond: {
    backgroundColor: '#ffffff',
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 14,
    paddingBottom: 29,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
  },
  divider: {
    backgroundColor: '#ffffff',
    borderBottom: 'solid 1px #dedede',
  },
  titleSub: {
    color: '#f05c5c',
    fontSize: 14,
    margin: 0,
  },
  checkAll: {
    textAlign: 'right',
    marginTop: 11,
    paddingRight: 14,
    color: '#171b23',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 2,
  },
  agree: {
    border: 'solid 1px #bbc9e0',
  },
  agreeTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f8ff',
    borderBottom: 'solid 1px #bbc9e0',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
  },
  agreeTitleSub: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  agreeContentWrap: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    // maxHeight: 238,
  },
  agree2: {
    marginTop: 40,
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: 244,
    marginTop: 28,
    fontSize: 13,
    backgroundColor: '#171b23',
    color: '#ffffff',
  },
}));

const useStylesm = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },

  contentWrap: {},
  content: {
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  contentSecond: {
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 29,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
  },
  divider: {
    backgroundColor: '#ffffff',
    borderBottom: 'solid 1px #dedede',
  },
  titleSub: {
    color: '#f05c5c',
    fontSize: 12,
    margin: 0,
  },
  checkAll: {
    fontSize: 14,
    // textAlign: 'right',
    marginTop: 16,
    // paddingRight: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 2,
  },
  agree: {
    border: 'solid 1px #bbc9e0',
  },
  // agreeTitle: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#f3f8ff',
  //   borderBottom: 'solid 1px #bbc9e0',
  //   paddingLeft: 14,
  //   paddingRight: 14,
  //   alignItems: 'center',
  // },
  // agreeTitleSub: {
  //   paddingTop: 8,
  //   paddingBottom: 8,
  //   fontSize: 14,
  //   fontWeight: 'bold',
  // },
  // agreeContentWrap: {
  //   paddingTop: 14,
  //   paddingBottom: 14,
  //   paddingLeft: 14,
  //   paddingRight: 14,
  //   // maxHeight: 238,
  // },
  // agree2: {
  //   marginTop: 40,
  // },
  // buttonWrap: {
  //   display: 'flex',
  //   justifyContent: 'center',
  // },
  // button: {
  //   fontSize: 13,
  //   backgroundColor: '#171b23',
  //   color: '#ffffff',
  // },
}));
function SignupStep1({ handleStep }) {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const [open, setOpen] = useState(false);

  // function handleClickOpen() {
  //   setOpen(true);
  // }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChangeAll = () => {
    setState({
      checkedA: !state.checkedA,
      checkedB: !state.checkedA,
      checkedC: !state.checkedA,
    });
  };
  const handleNextStep = () => {
    if (state.checkedB && state.checkedC) {
      handleStep(1);
    } else {
      setOpen(true);
    }
  };

  if (matches) {
    return (
      <div className={classesm.root}>
        <div className={classesm.contentWrap}>
          <div className={classesm.content}>
            <div className={classesm.title}>회원가입</div>
          </div>
          <Divider />
          <div className={classesm.contentSecond}>
            <p className={classesm.titleSub}>
              ** 회원가입약관 및 개인정보처리방침안내의 내용에 동의하셔야
              회원가입 하실 수 있습니다.
            </p>
            <div className={classesm.checkAll}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedA}
                    onChange={handleChangeAll}
                    value="checkedA"
                    // color="primary"
                  />
                }
                label="전체선택"
                // labelPlacement="start"
                classes={{
                  label: classesm.label, // class name, e.g. `classes-nesting-root-x`
                }}
              />
            </div>
            <div className={classesm.agree}>
              <div className={classesm.agreeTitle}>
                <span className={classesm.agreeTitleSub}>• 회원가입약관</span>
              </div>
              <div className={classesm.agreeContentWrap}>
                <Agree1 />
              </div>
            </div>
            <span>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange('checkedB')}
                    value="checkedB"
                    // color="primary"
                  />
                }
                label="회원가입약관의 내용에 동의합니다."
                // labelPlacement="start"
                classes={{
                  label: classesm.label, // class name, e.g. `classes-nesting-root-x`
                }}
              />
            </span>
            <div className={classNames(classesm.agree, classesm.agree2)}>
              <div className={classesm.agreeTitle}>
                <span className={classesm.agreeTitleSub}>
                  • 개인정보처리방침안내
                </span>
              </div>
              <div className={classesm.agreeContentWrap}>
                <Agree2 />
              </div>
            </div>
            <span>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedC}
                    onChange={handleChange('checkedC')}
                    value="checkedC"
                    // color="primary"
                  />
                }
                label="개인정보처리방침안내의 내용에 동의합니다."
                // labelPlacement="start"
                classes={{
                  label: classesm.label, // class name, e.g. `classes-nesting-root-x`
                }}
              />
            </span>
            <div className={classesm.buttonWrap}>
              {state.checkedB && state.checkedC ? (
                <Button
                  variant="contained"
                  className={classesm.button}
                  onClick={handleNextStep}
                >
                  회원가입
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classesm.button}
                  onClick={handleNextStep}
                  disabled
                >
                  회원가입
                </Button>
              )}
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              약관에 모두 동의하셔야 합니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <div className={classes.title}>회원가입</div>
        </div>
        <Divider />
        <div className={classes.contentSecond}>
          <p className={classes.titleSub}>
            ** 회원가입약관 및 개인정보처리방침안내의 내용에 동의하셔야 회원가입
            하실 수 있습니다.
          </p>
          <div className={classes.checkAll}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChangeAll}
                  value="checkedA"
                  color="primary"
                />
              }
              label="전체선택"
              labelPlacement="start"
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-root-x`
              }}
            />
          </div>
          <div className={classes.agree}>
            <div className={classes.agreeTitle}>
              <span className={classes.agreeTitleSub}>• 회원가입약관</span>
              <span>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange('checkedB')}
                      value="checkedB"
                      color="primary"
                    />
                  }
                  label="회원가입약관의 내용에 동의합니다."
                  labelPlacement="start"
                  classes={{
                    label: classes.label, // class name, e.g. `classes-nesting-root-x`
                  }}
                />
              </span>
            </div>
            <div className={classes.agreeContentWrap}>
              <Agree1 />
            </div>
          </div>
          <div className={classNames(classes.agree, classes.agree2)}>
            <div className={classes.agreeTitle}>
              <span className={classes.agreeTitleSub}>
                • 개인정보처리방침안내
              </span>
              <span>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedC}
                      onChange={handleChange('checkedC')}
                      value="checkedC"
                      color="primary"
                    />
                  }
                  label="개인정보처리방침안내의 내용에 동의합니다."
                  labelPlacement="start"
                  classes={{
                    label: classes.label, // class name, e.g. `classes-nesting-root-x`
                  }}
                />
              </span>
            </div>
            <div className={classes.agreeContentWrap}>
              <Agree2 />
            </div>
          </div>
          <div className={classes.buttonWrap}>
            {state.checkedB && state.checkedC ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleNextStep}
              >
                회원가입
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleNextStep}
                disabled
              >
                회원가입
              </Button>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            약관에 모두 동의하셔야 합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SignupStep1.propTypes = {
  handleStep: PropTypes.func.isRequired,
};

export default memo(SignupStep1);
