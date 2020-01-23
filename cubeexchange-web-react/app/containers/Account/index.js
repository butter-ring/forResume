/**
 *
 * Account
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import classNames from 'classnames';
import request from 'utils/request';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
// import MyInfo from 'components/MyInfo';
import ErrorPop from 'components/ErrorPop';
// import Typography from '@material-ui/core/Typography';
import { makeSelectSignin } from 'containers/App/selectors';
import Dialog from '@material-ui/core/Dialog';
import { signout } from 'containers/App/actions';
import { findMyInfo } from './actions';
import makeSelectAccount from './selectors';
import reducer from './reducer';
import saga from './saga';
import AuthIcon from '../../images/certification-authorization.png';
import EmailIcon from '../../images/certification-email.png';
import CheckIcon from '../../images/certified-check.png';
import CheckNoneIcon from '../../images/certification-none.png';
// import BasicIcon from '../../images/certification-basic.png';

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
    width: '100%',
    padding: 30,
    // paddingTop: theme.spacing(0),
  },
  gridroot: {
    flexGrow: 1,
    overflow: 'hidden', // 이게 없으면 네모 박스 가로정렬 깨짐. (float으로 인한)
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  title: {
    fontSize: 24,
    paddingBottom: 30,
    // fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  yellowtext: {
    fontSize: 16,
    color: '#f09614',
    paddingBottom: 30,
  },
  // flexBox: {
  //   flexGrow: 1,
  // },
  certiBox: {
    width: 220,
    height: 142,
    fontSize: 14,
    marginRight: 20,
    marginBottom: 20,
    float: 'left',
    border: '1px solid #b5b5b6',
    borderRadius: 3,
    backgroundImage: `url(${CheckIcon})`,
    backgroundPositionX: 180,
    backgroundPositionY: 16,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px 20px',
  },
  certiBoxNone: {
    width: 220,
    height: 142,
    fontSize: 14,
    marginRight: 20,
    marginBottom: 20,
    float: 'left',
    border: '1px solid #f09614',
    borderRadius: 3,
    backgroundImage: `url(${CheckNoneIcon})`,
    backgroundPositionX: 180,
    backgroundPositionY: 16,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '20px 20px',
    cursor: 'pointer',
  },
  certiEmailImage: {
    width: 37,
    height: 25,
    margin: 'auto',
    marginTop: 30,
    marginBottom: 10,
    display: 'flex',
  },
  certiAuthImage: {
    width: 20,
    height: 25,
    margin: 'auto',
    marginTop: 30,
    marginBottom: 10,
    display: 'flex',
  },
  certiText: {
    margin: 'auto',
    textAlign: 'center',
    color: '#787878',
  },
  graytext: {
    color: '#787878',
  },
  textField: {
    margin: theme.spacing(1),
    // fontSize: '1.3rem',
    fontSize: 14,
  },
  dense: {
    marginTop: theme.spacing(1),
    width: 242,
    fontSize: '1.3rem',
  },
  pwbutton: {
    width: 148,
    height: 36,
    backgroundColor: '#ffffff',
    border: '1px solid #b5b5b6',
    borderRadius: 3,
    color: '#787878',
    margin: theme.spacing(1),
    fontSize: '1.3rem',
  },
  typography: {
    padding: theme.spacing(5),
  },
  usernameText: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    paddingTop: 30,
    display: 'flex',
  },
  cancelButton: {
    marginLeft: 10,
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
}));

export function Account({
  account,
  findMyInfoGet,
  signoutAction,
  isSignin,
  history,
}) {
  useInjectReducer({ key: 'account', reducer });
  useInjectSaga({ key: 'account', saga });

  if (isSignin !== true) {
    history.push('/');
  }
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openm, setOpenm] = React.useState(false);
  const [openpw, setOpenpw] = React.useState(false);
  const [openCheck, setOpenCheck] = React.useState(false);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordCert, setPasswordCert] = useState('');
  const [passwordCertValid, setPasswordCertValid] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [passwordEmptyState, setPasswordEmptyState] = useState({
    password: true,
    passwordCert: true,
    currentPassword: true,
  });
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  // const [loading, setLoading] = useState(false);
  // const [loadingAll, setLoadingAll] = useState(false);
  useEffect(() => {
    findMyInfoGet();
  }, []);
  console.log(':::::::계정 정보:::::::::');
  console.log(account.account);

  const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^()]{8,25}$',
  );

  const CloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  // const handleOpen = () => {
  //   setOpenm(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenModal = () => {
    setOpenm(true);
  };

  const CloseModal = () => {
    setOpenm(false);
  };

  const OpenModalpw = () => {
    setOpenpw(true);
  };

  const openCheckModal = () => {
    setOpenCheck(true);
  };

  const closeCheckModal = () => {
    setOpenCheck(false);
  };

  const CloseModalpw = () => {
    setOpenpw(false);
    setPassword('');
    setPasswordCert('');
  };

  const handleCurrentPassword = e => {
    setCurrentPassword(e.target.value);
  };

  const handlePasswordCert = e => {
    setPasswordCert(e.target.value);
    setPasswordCertValid(password === e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
    setPasswordValid(passwordRegex.test(e.target.value));
    const paswordBoolean = Boolean(passwordCert);
    if (paswordBoolean) {
      setPasswordCertValid(passwordCert === e.target.value);
    }
  };

  const handleSignout = () => {
    signoutAction();
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
    const result = await request(`/api/account/checkpassword`, options);
    // console.log('오니?');
    // console.log(result);
    if (result.data === true) {
      setCurrentPasswordValid(true);
    } else {
      currentPasswordValid(false);
    }
    setLoading(false);
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

  const clickPasswordHandle = async () => {
    setOpen(true);
    // setLoadingAll(true);

    if (!passwordValidation()) {
      // setLoadingAll(false);
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
      const result = await request(`/api/account/updatepassword`, options);
      console.log('비밀번호 변경 확인');
      console.log(result);
      if (result) {
        alert('비밀번호 변경이 성공하였습니다. 재로그인이 필요합니다.');
        handleSignout();
        history.push('/');
      }
    } catch (err) {
      console.log(err.response);
      // setLoadingAll(false);
      setOpenm(false);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    }
  };

  const sendEmail = async () => {
    // setOpen(true);

    const options = {
      method: 'POST',
      auth: true,
    };
    try {
      const result = await request(`/api/account/emailauth`, options);
      console.log('send?');
      console.log(result);
      if (result) {
        CloseModal();
        openCheckModal();
      }
    } catch (err) {
      console.log(err.response);
      setOpen(false);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>Account</div>
      <div className={classes.yellowtext}>조팍스 입출금 레벨</div>
      {/* 네모박스 시작 */}
      <div className={classes.gridroot}>
        {sessionStorage.getItem('roles') !== 'ROLE_USER' ? (
          // <Button onClick={OpenModal}>
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link onClick={OpenModal}>
            <div className={classes.certiBoxNone}>
              <img
                className={classes.certiEmailImage}
                src={EmailIcon}
                alt="certification"
              />
              <div className={classes.certiText}>
                이메일 인증
                <br />
                미인증
              </div>
            </div>
          </Link>
        ) : (
          <div className={classes.certiBox}>
            <img
              className={classes.certiEmailImage}
              src={EmailIcon}
              alt="certification"
            />
            <div className={classes.certiText}>
              이메일 인증
              <br />
              완료
            </div>
          </div>
        )}
        {account.account.authKeystatus && account.account.authKeyactive ? (
          <Link to="/otp">
            <div className={classes.certiBox}>
              <img
                className={classes.certiAuthImage}
                src={AuthIcon}
                alt="certification"
              />
              <div className={classes.certiText}>
                OTP 인증
                <br />
                완료
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/otp">
            <div className={classes.certiBoxNone}>
              <img
                className={classes.certiAuthImage}
                src={AuthIcon}
                alt="certification"
              />
              <div className={classes.certiText}>
                OTP 인증
                <br />
                거래 가능
              </div>
            </div>
          </Link>
        )}
      </div>
      {/* 여기까지 네모들 모임 */}
      <div className={classes.graytext}>
        * 일 출금 한도는 각 자산 출금 액수의 총합을 기준으로 합니다.
      </div>
      <div className={classes.graytext}>* 일 입금은 무제한 가능합니다.</div>
      <br />
      <br />
      <Divider />
      <br />
      <div className={classes.yellowtext}>회원정보</div>
      <div>
        <TextField
          id="email"
          align="left"
          type="email"
          name="email"
          label="email"
          // helperText={hemail}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          disabled
          value={account.account.username}
          // onChange={handleEmail}
        />
      </div>
      <div>
        <TextField
          id="name"
          align="left"
          label="닉네임"
          // helperText={hname}
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          type="text"
          variant="outlined"
          value=""
          // onChange={handleName}
        />
      </div>
      <Divider />
      <br />
      <div className={classes.yellowtext}>패스워드</div>
      <div>
        <Button onClick={OpenModalpw} className={classes.pwbutton}>
          패스워드 변경
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openpw}
          onClose={CloseModalpw}
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
                  * 영대문자,영소문자, 숫자 입력 가능. 6~20자리 내에 입력하세요.
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
                  !passwordCertValid && passwordCert && classes.inputError,
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
              <Button
                variant="contained"
                onClick={CloseModalpw}
                className={classes.cancelButton}
              >
                취소
              </Button>
              {loading && (
                <CircularProgress
                  size={22}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </Modal>
      </div>

      <Divider />
      <br />

      {/* <MyInfo account={account.account} /> */}

      {sessionStorage.getItem('roles') !== 'ROLE_USER' && (
        <Button
          variant="contained"
          className={classes.button}
          onClick={OpenModal}
        >
          이메일 인증하기
        </Button>
      )}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openm}
        onClose={CloseModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <span className={classes.usernameText}>
            {account.account && account.account.username}
          </span>
          &nbsp;
          <span>(으)로 인증 메일을 발송합니다.</span>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={sendEmail}
            >
              보내기
            </Button>
            <Button
              variant="contained"
              onClick={CloseModal}
              className={classes.cancelButton}
            >
              취소
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openCheck}
        onClose={closeCheckModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <span className={classes.usernameText}>
            {account.account && account.account.username}
          </span>
          &nbsp;
          <span>
            (으)로 인증 메일을 발송했습니다. 해당 이메일로 로그인하여
            인증해주세요.
          </span>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              onClick={closeCheckModal}
              className={classes.cancelButton}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
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
      {openError.open && (
        <ErrorPop
          handleClose={CloseError}
          openError={openError}
          errorTitle="수정 오류"
        />
      )}
    </div>
  );
}

Account.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  account: PropTypes.any,
  findMyInfoGet: PropTypes.func,
  history: PropTypes.any,
  signoutAction: PropTypes.func,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMyInfoGet: () => {
      dispatch(findMyInfo());
    },
    signoutAction: () => {
      dispatch(signout());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Account);
