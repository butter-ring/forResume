/**
 *
 * UpdateMyInfo
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles, useTheme } from '@material-ui/styles';
import { makeSelectMyPage } from 'containers/MyPage/selectors';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { findMypageById } from 'containers/MyPage/actions';
import reducer from 'containers/MyPage/reducer';
import saga from 'containers/MyPage/saga';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import request from 'utils/request';
import { format } from 'date-fns';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import ErrorPop from 'components/ErrorPop';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import { signout } from 'containers/App/actions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
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
  link: {
    textDecoration: 'none',
  },
  inputLabel: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    color: '#3b69c1',
    paddingBottom: 4,
  },
}));

function UpdateMyInfo({ history, myPage, signoutAction, findMypageByIdGet }) {
  const classes = useStyles();
  useInjectReducer({ key: 'myPage', reducer });
  useInjectSaga({ key: 'myPage', saga });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const contentStartRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  const [birthday, setBirthday] = useState('');
  const [birthdayValid, setBirthdayValid] = useState(false);
  const [realName, setRealName] = useState('');
  const [gender, setGender] = useState('');
  const [nickName, setNickName] = useState('');
  const [nickNameValid, setNickNameValid] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCert, setPasswordCert] = useState('');
  const [passwordCertValid, setPasswordCertValid] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);

  const [open, setOpen] = useState(false);

  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const [passwordEmptyState, setPasswordEmptyState] = useState({
    password: true,
    passwordCert: true,
    currentPassword: true,
  });

  const [emptyState, setEmptyState] = useState({
    realName: true,
    gender: true,
    birthday: true,
    nickName: true,
  });

  const setting = birthdayFormat => {
    setNickName(myPage.myPage.nickName);
    setGender(myPage.myPage.gender);
    setRealName(myPage.myPage.realName);
    setBirthday(birthdayFormat);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    findMypageByIdGet();
  }, []);

  useEffect(() => {
    scrollToTop();
    if (myPage) {
      // console.log(myPage);

      if (myPage.myPage.birthday) {
        let month = myPage.myPage.birthday[1];

        if (month < 10) {
          month = `0${myPage.myPage.birthday[1]}`;
        }

        let day = myPage.myPage.birthday[2];
        if (day < 10) {
          day = `0${myPage.myPage.birthday[2]}`;
        }
        const dateString = `${
          myPage.myPage.birthday[0]
        }-${month}-${day}T00:00:00`;
        const date = new Date(dateString);
        // console.log(date);
        const birthdayFormat = format(date, 'yyyy-MM-dd');
        setting(birthdayFormat);
      }
    }
    return () => {
      // console.log('cleanup');
    };
  }, [myPage]);

  // useEffect(() => {

  // }, [myPage]);

  // modal settings
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  // modal settings End

  const passwordRegex = new RegExp(
    // '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^()]{8,25}$',
    '^[a-zA-Z0-9]{6,25}$',
  );

  function isValidDate(dateString) {
    const regEx = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
    // console.log(dateString.match(regEx));
    if (!dateString.match(regEx)) return false; // Invalid format
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  }

  const handleCurrentPassword = e => {
    setCurrentPassword(e.target.value);
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

  const handleGender = e => {
    setGender(e.target.value);
  };

  const handleRealName = e => {
    setRealName(e.target.value);
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

  // 닉네임 중복 확인
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
    const result = await request(`/api/update/dup`, options);

    if (result.data < 0 || result.data === myPage.myPage.nickName) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
    setLoading(false);
    // };
    // postData();
  };

  // 현재 비밀번호 비교
  const checkCurrentPassword = async e => {
    setLoading(true);
    const options = {
      method: 'POST',
      data: {
        password: e.target.value,
      },
      auth: true,
    };
    const result = await request(`/api/mypage/checkpassword`, options);
    // console.log('오니?');
    // console.log(result);
    if (result.data === true) {
      setCurrentPasswordValid(true);
    } else {
      currentPasswordValid(false);
    }
    setLoading(false);
  };

  const clickPasswordHandle = async () => {
    setOpen(true);
    setLoadingAll(true);

    if (!passwordValidation()) {
      setLoadingAll(false);
      setOpen(false);
      return;
    }

    const options = {
      method: 'POST',
      data: {
        password,
        confirmPassword: passwordCert,
        currentPassword,
      },
      auth: true,
    };
    try {
      const result = await request(`/api/mypage/updatepassword`, options);
      console.log('비밀번호 변경 확인');
      console.log(result);
      if (result) {
        alert('비밀번호 변경이 성공하였습니다. 재로그인이 필요합니다.');
        handleSignout();
        history.push('/');
      }
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
      setOpen(false);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    }
  };

  // 정보 변경
  const clickHandler = async () => {
    setOpen(true);
    setLoadingAll(true);

    if (!validation()) {
      setLoadingAll(false);
      setOpen(false);
      return;
    }

    const options = {
      method: 'POST',
      data: {
        realName,
        gender,
        birthday,
        nickName,
      },
      auth: true,
    };
    try {
      const result = await request(`/api/mypage/updateinfo`, options);
      console.log(result);
      if (result) {
        alert('내 정보 변경이 완료되었습니다.');
        history.push('/mypage');
      }
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
    // setLoadingAll(false);
    // setOpen(false);
  };

  function passwordValidation() {
    setPasswordEmptyState({
      password: Boolean(password),
      passwordCert: Boolean(passwordCert),
      currentPassword: Boolean(currentPassword),
    });
    if (
      Boolean(password) &&
      Boolean(passwordCert) &&
      Boolean(currentPassword) &&
      passwordValid &&
      passwordCertValid &&
      currentPassword
    ) {
      return true;
    }
    return false;
  }

  function validation() {
    setEmptyState({
      realName: Boolean(realName),
      gender: Boolean(gender),
      birthday: Boolean(birthday),
      nickName: Boolean(nickName),
    });
    if (
      Boolean(realName) &&
      Boolean(gender) &&
      Boolean(birthday) &&
      Boolean(nickName) &&
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

  const handleSignout = () => {
    signoutAction();
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
          <div className={classes.title}>내 정보 수정</div>
        </div>
        <Divider />
        <div className={classes.contentSecond}>
          <div className={classes.siteInfo}>
            <div>
              <Button
                onClick={handleModalOpen}
                // variant="outlined"
                color="primary"
                variant="contained"
              >
                비밀번호 변경하기 &#62;
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalOpen}
                onClose={handleModalClose}
              >
                <div style={modalStyle} className={classes.paper}>
                  <div className={classes.inputWrap} paddingBottom="20">
                    <input
                      type="password"
                      className={classNames(
                        classes.input,
                        !currentPassword && classes.inputError,
                        !passwordEmptyState.currentPassword &&
                          !currentPassword &&
                          classes.inputEmpty,
                      )}
                      placeholder="현재 비밀번호(필수)"
                      value={currentPassword}
                      onChange={handleCurrentPassword}
                      onBlur={checkCurrentPassword}
                      name="currentPassword"
                      // disabled={loading && true}
                    />
                    {/* {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )} */}
                    {currentPassword && !currentPasswordValid && (
                      <span className={classes.errorValidText}>
                        * 현재 비밀번호가 틀렸습니다.
                      </span>
                    )}
                  </div>
                  <div className={classes.inputWrap}>
                    <input
                      type="password"
                      className={classNames(
                        classes.input,
                        !passwordValid && password && classes.inputError,
                        !passwordEmptyState.password &&
                          !password &&
                          classes.inputEmpty,
                      )}
                      placeholder="새비밀번호 (필수)"
                      value={password}
                      onChange={handlePassword}
                      name="password"
                    />
                    {!passwordValid && (
                      <span className={classes.tooltipUsername}>
                        * 영문자(소), 숫자만 입력 가능. 6~20자리 내에
                        입력하세요.
                      </span>
                    )}
                    {!passwordEmptyState.password && !password && (
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
                        !passwordCertValid &&
                          passwordCert &&
                          classes.inputError,
                        !passwordEmptyState.passwordCert &&
                          !passwordCert &&
                          classes.inputEmpty,
                      )}
                      placeholder="새비밀번호확인 (필수)"
                      value={passwordCert}
                      onChange={handlePasswordCert}
                      name="passwordCert"
                    />
                    {!passwordCertValid && passwordCert && (
                      <span className={classes.errorValidText}>
                        * 비밀번호와 일치해야 합니다.
                      </span>
                    )}
                    {!passwordEmptyState.passwordCert && !passwordCert && (
                      <div>
                        <span className={classes.errorValidText}>
                          * 비밀번호(확인)를 입력해 주세요.
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    {currentPasswordValid && passwordValid ? (
                      <Button
                        onClick={clickPasswordHandle}
                        variant="contained"
                        color="primary"
                      >
                        변경하기
                      </Button>
                    ) : (
                      <Button
                        onClick={clickPasswordHandle}
                        variant="contained"
                        color="primary"
                        disabled
                      >
                        변경하기
                      </Button>
                    )}
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.inputWrap}>
              <InputLabel for="name" className={classes.inputLabel}>
                이름
              </InputLabel>
              <input
                type="text"
                id="name"
                className={classNames(
                  classes.input,
                  !emptyState.realName && !realName && classes.inputEmpty,
                )}
                placeholder="이름 (필수)"
                value={realName}
                onChange={handleRealName}
                name="realName"
              />
              {!emptyState.realName && !realName && (
                <div>
                  <span className={classes.errorValidText}>
                    * 이름을 입력해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <InputLabel for="gender" className={classes.inputLabel}>
                성별
              </InputLabel>
              <FormControl variant="outlined" className={classes.formControl}>
                {/* <InputLabel htmlFor="outlined-age-simple">Gender</InputLabel> */}
                <Select
                  value={gender}
                  onChange={handleGender}
                  displayEmpty
                  id="gender"
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
                      !emptyState.gender && !gender
                        ? classes.inputEmpty
                        : classes.outlined,
                  }}
                >
                  <MenuItem value={gender}>
                    <span className={classes.selectNoneTest}>성별</span>
                  </MenuItem>
                  <MenuItem value="MALE">남자</MenuItem>
                  <MenuItem value="FEMALE">여자</MenuItem>
                </Select>
              </FormControl>
              {!emptyState.gender && !gender && (
                <div>
                  <span className={classes.errorValidText}>
                    * 성별을 선택해 주세요.
                  </span>
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              <InputLabel for="birthday" className={classes.inputLabel}>
                생년월일(YYYY-MM-DD)
              </InputLabel>
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
                id="birthday"
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
              <InputLabel for="nickname" className={classes.inputLabel}>
                닉네임
              </InputLabel>
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
                id="nickname"
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
          <Grid container spacing={0} className={classes.buttonWrap}>
            <Grid item xs={4}>
              <div>
                <Link to="/mypage" className={classes.link}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonCancel}
                  >
                    취소
                  </Button>
                </Link>
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
                  수정하기
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
          errorTitle="수정 오류"
        />
      )}
      {/* {token && <p>Token: {token}</p>} */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  myPage: makeSelectMyPage(),
});

UpdateMyInfo.propTypes = {
  findMypageByIdGet: PropTypes.func,
  history: PropTypes.any,
  myPage: PropTypes.any,
  signoutAction: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutAction: () => {
      dispatch(signout());
    },
    findMypageByIdGet: () => {
      dispatch(findMypageById());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UpdateMyInfo);
