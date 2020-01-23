/**
 *
 * SignupStep2
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import request from 'utils/request';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ErrorPop from 'components/ErrorPop';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
    width: '100%',
    height: 1000,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingTop: 20,
    paddingBottom: 6,
    marginBottom: 14,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
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
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: 30,
    paddingBottom: 29,
    // [theme.breakpoints.down('xs')]: {
    //   paddingLeft: 15,
    //   paddingRight: 15,
    // },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 10,
    // borderBottom: 'solid 1px #dedede',
    // [theme.breakpoints.down('xs')]: {
    //   fontSize: 16,
    // },
  },
  inputWrap: {
    marginBottom: 14,
    marginTop: 20,
    paddingRight: '20%',
    paddingLeft: '20%',
  },
  input: {
    paddingLeft: 14,
    paddingRight: 14,
    width: '100%',
    height: 38,
    border: 'solid 1px #a6a6a6',
    '&::placeholder': {
      fontFamily: 'NotoSansCJKkr',
      color: '#a6a6a6',
      opacity: 1,
      fontSize: 13,
    },
    '&:-ms-input-placeholder': {
      fontFamily: 'NotoSansCJKkr',
      color: '#a6a6a6',
      fontSize: 13,
    },
    '&::-ms-input-placeholder': {
      fontFamily: 'NotoSansCJKkr',
      color: '#a6a6a6',
      fontSize: 13,
    },
  },
  inputError: {
    border: 'solid 1px #f05c5c',
  },
  inputEmpty: {
    borderRadius: 0,
    border: 'solid 1px #f05c5c',
  },
  tooltipUsername: {
    fontSize: 12,
    color: '#f6853c',
    paddingTop: 5,
  },
  errorValidText: {
    fontSize: 12,
    color: '#f05c5c',
    paddingTop: 5,
  },
  siteInfo: {
    marginBottom: 40,
  },
  formControl: {
    width: '100%',
  },
  notchedOutline: {
    borderRadius: 0,
  },
  selectMenu: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  outlined: {
    borderRadius: 0,
    border: 'solid 1px #a6a6a6',
  },
  selectNoneTest: {
    fontFamily: 'NotoSansCJKkr',
    color: '#a6a6a6',
    fontSize: 13,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
  button: {
    width: '100%',
    fontSize: 13,
    backgroundColor: '#171b23',
    color: '#ffffff',
  },
  buttonCancel: {
    width: '100%',
    backgroundColor: '#a6a6a6',
    // paddingRight: 10,
    fontSize: 13,
  },
  confirmButtonWrap: {
    paddingLeft: 13,
  },
  buttonWrap: {
    marginTop: 34,
  },
  label: {
    fontSize: 13,
    // fontWeight: 'bold',
    alignItems: 'center',
    // paddingTop: 2,
    color: '#313131',
  },
  titleSub: {
    color: '#f05c5c',
    fontSize: 14,
    margin: 0,
  },
}));

function SignupStep2({ handleStep, signupComplete }) {
  console.log(handleStep);

  const classes = useStyles();
  // const contentStartRef = useRef(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loadingAll, setLoadingAll] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCert, setPasswordCert] = useState('');
  const [passwordCertValid, setPasswordCertValid] = useState(false);

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const [emptyState, setEmptyState] = useState({
    username: true,
    password: true,
    passwordCert: true,
  });

  const [checkedA, setCheckedA] = useState(false);

  // email 형식
  const usernameRegex = new RegExp(
    // '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
  );

  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^()]{8,25}$',
  );

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
    return () => {
      // console.log('cleanup');
    };
  }, []);

  // const handleChange = event => {
  //   // console.log(event.target.name);
  //   // console.log(event.target.value);
  //   setState({
  //     ...state,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleUsername = e => {
    setUsername(e.target.value);
    setUsernameValid(usernameRegex.test(e.target.value));
  };

  const handlePassword = e => {
    setPassword(e.target.value);
    setPasswordValid(passwordRegex.test(e.target.value));
    const paswordBoolean = Boolean(passwordCert);
    if (paswordBoolean) {
      setPasswordCertValid(passwordCert === e.target.value);
    }
  };

  const handlePasswordCert = e => {
    setPasswordCert(e.target.value);
    setPasswordCertValid(password === e.target.value);
  };

  const handleChecked = event => {
    setCheckedA(event.target.checked);
  };

  const clickHandler = async () => {
    setOpen(true);
    setLoadingAll(true);

    console.log('clickHandler');

    // setToken(result);
    if (!validation()) {
      console.log('validation');
      setLoadingAll(false);
      setOpen(false);
      return;
    }
    if (!executeRecaptcha) {
      console.log('executeRecaptcha');
      console.log(executeRecaptcha);
      setLoadingAll(false);
      setOpen(false);
      return;
    }
    // const result = await executeRecaptcha('homepage');
    // const data = new FormData();
    // data.append('username', username);
    // data.append('password', password);
    // data.append('passwordCert', passwordCert);
    // data.append('realName', state.realName);
    // data.append('email', email);
    // data.append('email', state.gender);
    // data.append('email', birthday);
    // data.append('email', nickName);
    // data.append('token', result);
    const recaptchaToken = await executeRecaptcha('homepage');
    const options = {
      method: 'POST',
      data: {
        username,
        password,
        confirmPassword: passwordCert,
        recaptchaToken,
      },
      auth: false,
    };
    console.log('options check');
    console.log(options);
    try {
      const response = await request(`/api/signup`, options);
      signupComplete(2, username);
      console.log(response);
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
      setOpen(false);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    }
    // setToken(result);
    setLoadingAll(false);
    setOpen(false);
  };

  function validation() {
    setEmptyState({
      username: Boolean(username),
      password: Boolean(password),
      passwordCert: Boolean(passwordCert),
    });
    if (
      Boolean(username) &&
      Boolean(password) &&
      Boolean(passwordCert) &&
      usernameValid &&
      passwordValid &&
      passwordCertValid
    ) {
      return true;
    }
    return false;
  }

  function handleClose() {
    setOpen(false);
  }

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <div className={classes.title}>회원가입</div>
        </div>
        <Divider />
        <div className={classes.contentSecond}>
          <p className={classes.titleSub}>
            ** Cube Exchange 사용을 위해 이메일 인증이 필요합니다.​ 실제로
            사용하는 이메일을 입력해주세요.
          </p>
          <div className={classes.siteInfo}>
            <div className={classes.inputWrap}>
              <input
                type="text"
                className={classNames(
                  classes.input,
                  !usernameValid && username && classes.inputError,
                  !emptyState.username && !username && classes.inputEmpty,
                )}
                placeholder="이메일"
                value={username}
                onChange={handleUsername}
                name="username"
              />
              {!usernameValid && username && (
                <span className={classes.tooltipUsername}>
                  * 올바른 이메일 형식을 입력해 주세요
                </span>
              )}
              {!emptyState.username && !username && (
                <div>
                  <span className={classes.errorValidText}>
                    * 이메일을 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <input
                type="password"
                className={classNames(
                  classes.input,
                  !passwordValid && password && classes.inputError,
                  !emptyState.password && !password && classes.inputEmpty,
                )}
                placeholder="비밀번호 (필수)"
                value={password}
                onChange={handlePassword}
                name="password"
              />
              {!passwordValid && password && (
                <span className={classes.tooltipUsername}>
                  * 영소문자, 영대문자, 숫자를 포함한 6~25자리를 입력하세요.
                </span>
              )}
              {!emptyState.password && !password && (
                <div>
                  <span className={classes.errorValidText}>
                    * 비밀번호를 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <input
                type="password"
                className={classNames(
                  classes.input,
                  !passwordCertValid && passwordCert && classes.inputError,
                  !emptyState.passwordCert &&
                    !passwordCert &&
                    classes.inputEmpty,
                )}
                placeholder="비밀번호확인 (필수)"
                value={passwordCert}
                onChange={handlePasswordCert}
                name="passwordCert"
              />
              {!passwordCertValid && passwordCert && (
                <span className={classes.errorValidText}>
                  * 비밀번호와 일치해야 합니다.
                </span>
              )}
              {!emptyState.passwordCert && !passwordCert && (
                <div>
                  <span className={classes.errorValidText}>
                    * 비밀번호(확인)를 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedA}
                onChange={handleChecked}
                value="checkedA"
                color="primary"
              />
            }
            label="정보 메일을 받겠습니다."
            // labelPlacement="start"
            classes={{
              label: classes.label,
            }}
          />
          <Grid container spacing={0} className={classes.buttonWrap}>
            <Grid item xs={4}>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonCancel}
                  onClick={() => handleStep(0)}
                >
                  취소
                </Button>
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className={classes.confirmButtonWrap}>
                <Button
                  variant="contained"
                  // color="primary"
                  className={classes.button}
                  onClick={clickHandler}
                >
                  회원가입
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* {loadingAll && (
          <CircularProgress size={50} className={classes.buttonProgress} />
        )} */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        />
      </div>
      {openError.open && (
        <ErrorPop
          handleClose={handleCloseError}
          openError={openError}
          errorTitle="회원가입 오류"
        />
      )}
      {/* {token && <p>Token: {token}</p>} */}
    </div>
  );
}

SignupStep2.propTypes = {
  handleStep: PropTypes.func.isRequired,
  signupComplete: PropTypes.func.isRequired,
};

export default memo(SignupStep2);
