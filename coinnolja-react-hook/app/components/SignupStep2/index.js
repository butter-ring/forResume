/**
 *
 * SignupStep2
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import request from 'utils/request';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ErrorPop from 'components/ErrorPop';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
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
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 2,
    },
  },
  content: {
    backgroundColor: '#ffffff',
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 20,
    paddingBottom: 23,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 6,
    },
  },
  contentSecond: {
    backgroundColor: '#ffffff',
    paddingLeft: 239,
    paddingRight: 315,
    paddingTop: 30,
    paddingBottom: 29,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  inputWrap: {
    marginBottom: 14,
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
  selectRoot: {},
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
  },
  buttonCancel: {
    width: '100%',
    backgroundColor: '#a6a6a6',
    // paddingRight: 10,
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
}));

function SignupStep2({ handleStep, signupComplete }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const contentStartRef = useRef(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  // const [token, setToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCert, setPasswordCert] = useState('');
  const [passwordCertValid, setPasswordCertValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [birthdayValid, setBirthdayValid] = useState(false);
  const [nickName, setNickName] = useState('');
  const [nickNameValid, setNickNameValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const [state, setState] = useState({
    realName: '',
    gender: '',
  });

  const [emptyState, setEmptyState] = useState({
    username: true,
    password: true,
    passwordCert: true,
    realName: true,
    email: true,
    gender: true,
    birthday: true,
    nickName: true,
  });

  const [checkedA, setCheckedA] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
    return () => {
      // console.log('cleanup');
    };
  }, []);

  const usernameRegex = new RegExp('^[a-z0-9]{6,20}$');
  const passwordRegex = new RegExp(
    // '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^()]{8,25}$',
    '^[a-zA-Z0-9]{6,25}$',
  );
  const emailRegex = new RegExp(
    // '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
  );

  function isValidDate(dateString) {
    // const regEx = /^\d{4}-\d{2}-\d{2}$/;2101

    const regEx = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
    // console.log(dateString.match(regEx));
    if (!dateString.match(regEx)) return false; // Invalid format
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  }

  const handleChange = event => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

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
  const handleEmail = e => {
    setEmail(e.target.value);
    setEmailValid(emailRegex.test(e.target.value));
  };

  const handleBirthday = data => {
    if (data.value.length > 7) {
      // console.log(isValidDate(data.formattedValue));
      setBirthday(data.formattedValue);
      setBirthdayValid(isValidDate(data.formattedValue));
    }
  };

  const handleNickName = e => {
    setNickName(e.target.value);
  };

  const dupCheckNickName = async e => {
    // console.log(e.target.value);
    // const postData = async () => {
    setLoading(true);
    const options = {
      method: 'POST',
      data: {
        nickName: e.target.value,
      },
    };
    const result = await request(`/api/signup/dup`, options);

    if (result.data > 0) {
      setNickNameValid(false);
    } else {
      setNickNameValid(true);
    }
    setLoading(false);
    // };
    // postData();
  };

  const handleChecked = event => {
    setCheckedA(event.target.checked);
  };

  const clickHandler = async () => {
    setOpen(true);
    setLoadingAll(true);

    // setToken(result);
    if (!validation()) {
      setLoadingAll(false);
      setOpen(false);
      return;
    }
    if (!executeRecaptcha) {
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
        realName: state.realName,
        email,
        gender: state.gender,
        birthday,
        nickName,
        recaptchaToken,
      },
    };
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
      realName: Boolean(state.realName),
      email: Boolean(email),
      gender: Boolean(state.gender),
      birthday: Boolean(birthday),
      nickName: Boolean(nickName),
    });
    if (
      Boolean(username) &&
      Boolean(password) &&
      Boolean(passwordCert) &&
      Boolean(state.realName) &&
      Boolean(email) &&
      Boolean(state.gender) &&
      Boolean(birthday) &&
      Boolean(nickName) &&
      usernameValid &&
      passwordValid &&
      passwordCertValid &&
      emailValid &&
      birthdayValid &&
      nickNameValid
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
    <div ref={contentStartRef} id="contentStartRef" className={classes.root}>
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}

      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <div className={classes.title}>회원가입</div>
        </div>
        <Divider />
        <div className={classes.contentSecond}>
          <div className={classes.siteInfo}>
            <div className={classes.inputWrap}>
              <input
                type="text"
                className={classNames(
                  classes.input,
                  !usernameValid && username && classes.inputError,
                  !emptyState.username && !username && classes.inputEmpty,
                )}
                placeholder="아이디"
                value={username}
                onChange={handleUsername}
                name="username"
              />
              {!usernameValid && (
                <span className={classes.tooltipUsername}>
                  * 영문자(소), 숫자만 입력 가능. 6~20자리 내에 입력하세요.
                </span>
              )}
              {!emptyState.username && !username && (
                <div>
                  <span className={classes.errorValidText}>
                    * 아이디를 입력해 주세요.
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
              {!passwordValid && (
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
          <div className={classes.userInfo}>
            <div className={classes.inputWrap}>
              <input
                type="text"
                className={classNames(
                  classes.input,
                  !emptyState.realName && !state.realName && classes.inputEmpty,
                )}
                placeholder="이름 (필수)"
                value={state.realName}
                onChange={handleChange}
                name="realName"
              />
              {!emptyState.realName && !state.realName && (
                <div>
                  <span className={classes.errorValidText}>
                    * 이름을 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <input
                type="text"
                className={classNames(
                  classes.input,
                  !emailValid && email && classes.inputError,
                  !emptyState.email && !email && classes.inputEmpty,
                )}
                placeholder="이메일 (필수)"
                value={email}
                onChange={handleEmail}
                name="email"
              />
              {!emailValid && email && (
                <span className={classes.errorValidText}>
                  * 올바른 이메일 형식을 입력해 주세요
                </span>
              )}
              {!emptyState.email && !email && (
                <div>
                  <span className={classes.errorValidText}>
                    * 이메일을 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel htmlFor="outlined-age-simple">Gender</InputLabel> */}
                <Select
                  value={state.gender}
                  onChange={handleChange}
                  displayEmpty
                  input={
                    <OutlinedInput
                      // labelWidth={state.labelWidth}
                      name="gender"
                      id="outlined-age-simple"
                      classes={{
                        // root: classes.outlinedInput,
                        notchedOutline: classes.notchedOutline,
                      }}
                    />
                  }
                  classes={{
                    root: classes.selectRoot,
                    selectMenu: classes.selectMenu,
                    outlined:
                      !emptyState.gender && !state.gender
                        ? classes.inputEmpty
                        : classes.outlined,
                  }}
                >
                  <MenuItem value="">
                    <span className={classes.selectNoneTest}>성별</span>
                  </MenuItem>
                  <MenuItem value="MALE">남자</MenuItem>
                  <MenuItem value="FEMALE">여자</MenuItem>
                </Select>
              </FormControl>
              {!emptyState.gender && !state.gender && (
                <div>
                  <span className={classes.errorValidText}>
                    * 성별을 선택해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <NumberFormat
                className={classNames(
                  classes.input,
                  !birthdayValid && birthday && classes.inputError,
                  !emptyState.birthday && !birthday && classes.inputEmpty,
                )}
                format="####-##-##"
                placeholder="생년월일 (YYYY-MM-DD)"
                mask={['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']}
                value={birthday}
                onValueChange={handleBirthday}
                name="birthday"
              />
              {!birthdayValid && birthday && (
                <span className={classes.errorValidText}>
                  * 올바른 날짜형식을 입력해 주세요.
                </span>
              )}
              {!emptyState.birthday && !birthday && (
                <div>
                  <span className={classes.errorValidText}>
                    * 생일을 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classNames(classes.inputWrap, classes.wrapper)}>
              <input
                type="text"
                className={classNames(
                  classes.input,
                  !nickNameValid && nickName && classes.inputError,
                  !emptyState.nickName && !nickName && classes.inputEmpty,
                )}
                placeholder="닉네임"
                value={nickName}
                onChange={handleNickName}
                onBlur={dupCheckNickName}
                name="nickname"
                disabled={loading && true}
              />
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              {!nickNameValid && nickName && (
                <span className={classes.errorValidText}>
                  * 사용중인 닉네임 입니다
                </span>
              )}
              {!emptyState.nickName && !nickName && (
                <div>
                  <span className={classes.errorValidText}>
                    * 닉네임을 입력해 주세요.
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
                  color="primary"
                  className={classes.button}
                  onClick={clickHandler}
                >
                  회원가입
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        {loadingAll && (
          <CircularProgress size={50} className={classes.buttonProgress} />
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <div />
        </Dialog>
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
