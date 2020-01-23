/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-autofocus */
/**
 *
 * Signin
 *
 */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import { signin, signinotp } from 'containers/App/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import request from 'utils/request';
import ErrorPop from 'components/ErrorPop';
import {
  makeSelectSignin,
  makeSelectLoading,
  makeSelectError,
  makeSelectOtpActive,
  makeSelectUserDataOtp,
} from 'containers/App/selectors';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
// import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    // display: 'flex',
    width: '100%',
    height: 800,
    // border: 'solid 1px #dedede',
    backgroundColor: '#ffffff',
  },
  centerWrap: {
    display: 'inline-block',
    position: 'absolute',
    top: '30%',
    left: '40%',
    // verticalAlign: 'middle',
    border: 'solid 1.5px #ffba32',
    borderRadius: 3,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 60,
    paddingBottom: 64,
  },
  inputWrap: {
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: 244,
    // marginTop: 24,
  },
  input: {
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 38,
    border: 'solid 1px #a6a6a6',
  },
  inputFocus: {
    border: 'solid 1px #4d4d4d',
  },
  button: {
    width: '100%',
    backgroundColor: '#171b23',
    color: '#ffffff',
    // fontSize: 12,
  },
  linkWrap: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    // textAlign: 'center',
    color: '#3b69c1',
    marginTop: 20,
  },
  signinLink: {
    marginRight: 26,
  },
  textField: {
    marginLeft: 37,
    marginRight: 11,
    marginBottom: 10,
    paddingLeft: 25,
    width: 202,
    height: 43,
    border: '1px solid #a6a6a6',
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  button1: {
    width: 202,
    height: 43,
    marginLeft: 37,
    marginRight: 11,
    border: '1px solid #ffba32',
    borderRadius: 3,
    color: '#787878',
  },
  buttondisabled: {
    width: 202,
    height: 43,
    marginLeft: 37,
    marginRight: 11,
    border: '1px solid #00000042',
    borderRadius: 3,
    color: '#787878',
  },
  buttonProgress: {
    position: 'relative',
  },
});

export function Signin({
  error,
  signinAction,
  signinActionOtp,
  history,
  isSignin,
  otpActive,
  userDataOtp,
}) {
  useInjectReducer({ key: 'signin', reducer });
  useInjectSaga({ key: 'signin', saga });
  const classes = useStyles();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [focus, setFocus] = useState();
  const [otpdigit, setOtpdigit] = useState('');
  const [token, setToken] = useState('');
  const [otpdigitplace, setOtpdigitplace] = useState('       OTP 코드 입력');
  const [loadingAll, setLoadingAll] = useState(false);
  // const [useridnum, setUseridnum] = useState('');
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  useEffect(() => {
    // if (otpActive) {
      // setUseridnum(userDataOtp.userId);
    // }
  }, [userDataOtp.userId]);

  useEffect(() => {
    if (error !== false) {
      setOpenError({
        open: true,
        errorCode: {
          code: 800101,
        },
      });
    }
    return () => {
      setOpenError({
        open: false,
        errorCode: false,
      });
    };
  }, [error]);

  const handleChange = e => {
    const numberonly = e.target.validity.valid ? e.target.value : '';
    setOtpdigit(numberonly);
  };

  const EnterEvent = event => {
    if (event.key === 'Enter' && otpdigit.length === 6) {
      Otpcheck();
    }
  };

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  // setTimeout(() => {
  //   alert('60초 지났습니다.');
  // }, 60000);

  if (isSignin === true && otpActive === false) {
    history.push('/');
  }

  const Otpcheck = async () => {
    setLoadingAll(true);
    const options = {
      method: 'POST',
      auth: false,
      data: {
        otpdigit,
        useridnum: userDataOtp.userId
      },
    };

    try {
      const response = await request(`/api/otp/otpcheck`, options);
      if (response.data !== null) {
        console.log(response.data);
        if (response.data === false) {
          setOtpdigit('');
          setOtpdigitplace(' 잘못된 OTP 코드 입니다');
        }
        if (response.data === true && token !== '') {
          signinActionOtp(token);
        }else {
          window.location.reload()
        }
        setLoadingAll(false);
      }
    } catch (err) {
      console.log(err.response);
      setLoadingAll(false);
    }
    // setLoading(false);
    setLoadingAll(false);
  };

  const onSubmitFormInit = event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (username && password) {
      const signToken = Buffer.from(`${username}:${password}`).toString(
        'base64',
      );
      setToken(signToken);
      signinAction(signToken);
    } else {
      setOpenError({
        open: true,
        errorCode: {
          code: 800100,
        },
      });
    }
  };

  return (
    <div className={classes.root}>
      {loadingAll && (
        <CircularProgress size={50} className={classes.buttonProgress} />
      )}
      <div className={classes.centerWrap}>
        {(isSignin === false || isSignin === null) &&
          (otpActive === false || otpActive === null) && (
           <form onSubmit={onSubmitFormInit}>
              <div className={classes.inputWrap}>
              <div>
                <input
                  type="text"
                  className={classNames(
                      classes.input,
                    focus === 0 ? classes.inputFocus : null,
                  )}
                  onFocus={() => setFocus(0)}
                  placeholder="아이디"
                  name="username"
                />
              </div>
              <div>
                <input
                  type="password"
                  className={classNames(
                    classes.input,
                    focus === 1 ? classes.inputFocus : null,
                  )}
                  onFocus={() => setFocus(1)}
                  placeholder="비밀번호"
                  name="password"
                />
              </div>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
              >
                  로그인
              </Button>
            </div>
            <br />
              아직 계정이 없으신가요?
              <Link to="/signup" className={classes.link}>
                회원 가입
            </Link>
          </form>
        )}
        {openError.open && (
          <ErrorPop
            handleClose={handleCloseError}
            openError={openError}
            errorTitle="로그인"
          />
        )}

        {otpActive === true && (
          <div>
            OTP앱에 생성된 6자리 코드를 입력하십시오.
            <br />
            <br />
            <input
              className={classes.textField}
              autoFocus
              type="text"
              name="otpCode"
              pattern="[0-9]*"
              value={otpdigit}
              onChange={handleChange}
              maxLength="6"
              max="999999"
              onKeyPress={EnterEvent}
              placeholder={otpdigitplace}
            />
          </div>
        )}
        <span>
          {otpActive ? (
            otpdigit.length === 6 ? (
              <Button
                onClick={Otpcheck}
                color="primary"
                className={classes.button1}
              >
                OTP 인증
              </Button>
            ) : (
              <Button
                color="primary"
                disabled
                className={classes.buttondisabled}
              >
                OTP 인증
              </Button>
            )
          ) : (
            ''
          )}
        </span>
      </div>
    </div>
  );
}

Signin.propTypes = {
  signinAction: PropTypes.func,
  signinActionOtp: PropTypes.func,
  error: PropTypes.any,
  history: PropTypes.any,
  isSignin: PropTypes.any,
  otpActive: PropTypes.any,
  userDataOtp: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
  isSignin: makeSelectSignin(),
  otpActive: makeSelectOtpActive(),
  userDataOtp: makeSelectUserDataOtp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signinActionOtp: signToken => {
      if (signToken !== undefined) {
        dispatch(signinotp(signToken));
      }
    },
    signinAction: signToken => {
      if (signToken !== undefined) {
        dispatch(signin(signToken));
      }
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
)(Signin);
