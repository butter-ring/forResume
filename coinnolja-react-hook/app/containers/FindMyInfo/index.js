/**
 *
 * FindMyInfo
 *
 */

import React, { useState, useEffect, forwardRef } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeStyles } from '@material-ui/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import request from 'utils/request';
import ErrorPop from 'components/ErrorPop';
import { Link } from 'react-router-dom';

import makeSelectFindMyInfo from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
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
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 14,
    paddingBottom: 29,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  inputWrap: {
    textAlign: 'center',
    display: 'block',
  },
  input: {
    maxWidth: 280,
    width: '100%',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
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
  button: {
    maxWidth: 280,
    width: '100%',
  },
  buttonWrap: {
    marginTop: 15,
  },
  helptext: {
    marginTop: 15,
  },
  errorValidText: {
    fontSize: 14,
    color: '#f05c5c',
    paddingTop: 5,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  errorValidTextWrap: {
    paddingTop: 10,
  },
  inputError: {
    border: 'solid 1px #f05c5c',
  },

  bodyText: {
    fontFamily: 'NotoSansCJKkr',
    color: '#313131',
    fontSize: 34,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  svgWrap: {
    paddingTop: 69,
    paddingBottom: 58,
  },
  divider: {
    marginTop: 24,
    marginBottom: 26,
  },
  infoText: {
    fontFamily: 'NotoSansCJKkr',
    color: '#313131',
    fontSize: 16,
    paddingLeft: 89,
    paddingRight: 90,
    lineHeight: 1.63,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
      fontSize: 12,
    },
  },
  // button: {
  //   marginTop: 76,
  //   maxWidth: 244,
  //   width: '100%',
  //   [theme.breakpoints.down('xs')]: {
  //     marginTop: 30,
  //   },
  // },
  blue: {
    fontWeight: 'bold',
    color: '#4d85f1',
  },
}));

export function FindMyInfo() {
  useInjectReducer({ key: 'findMyInfo', reducer });
  useInjectSaga({ key: 'findMyInfo', saga });
  const classes = useStyles();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0);
  const [emailValid, setEmailValid] = useState(false);
  const [emptyState, setEmptyState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const emailRegex = new RegExp(
    // '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
  );
  useEffect(() => {}, [step]);
  const handleEmail = e => {
    setEmail(e.target.value);
    setEmailValid(emailRegex.test(e.target.value));
  };

  const handleSubmit = async () => {
    // console.log('call');
    if (loading) {
      return false;
    }
    const boolEmail = Boolean(email);
    if (!boolEmail) {
      setEmptyState(false);
      return false;
    }
    setEmptyState(true);
    try {
      setLoading(true);

      const options = {
        method: 'POST',
        data: {
          email,
        },
        auth: true,
      };
      const result = await request(`/api/member/findmyinfo`, options);
      console.log(result);
      if (result) {
        setStep(1);
      }
    } catch (err) {
      console.log(err.response.data);
      // setError(true);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    } finally {
      setLoading(false);
    }
    return false;
  };

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };
  console.log(step);
  if (step > 0) {
    return (
      <div className={classes.root}>
        <div className={classes.contentWrap}>
          <div className={classes.svgWrap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="111"
              height="104"
              viewBox="0 0 111 104"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#4D85F1"
                strokeLinecap="round"
              >
                <path
                  fill="#F3F8FF"
                  strokeWidth="4"
                  d="M88.651 17.99C79.521 8.154 66.48 2 52 2 24.386 2 2 24.386 2 52s22.386 50 50 50 50-22.386 50-50c0-5.465-.877-10.726-2.498-15.649"
                />
                <path strokeWidth="5" d="M31 45.7l18.252 17.922L108.3 15" />
              </g>
            </svg>
          </div>
          <div className={classes.bodyText}>메일 발송이 완료 되었습니다.</div>
          <div className={classes.bodyText}>
            <span className={classes.blue}>{email}</span>로 변경된 정보를
            발송하였습니다.
          </div>
          <Divider className={classes.divider} />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={handleMain}
            component={CollisionLink}
          >
            메인으로
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.topBanner}>
        <TopBanner />
      </div>
      <NoticeLine />
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <div className={classes.title}>아이디/비밀번호 찾기</div>
        </div>
        <Divider />
        <div className={classes.contentSecond}>
          <div className={classes.helptext}>
            * 회원 가입 시에 등록한 이메일을 입력해주세요.
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
              <div className={classes.errorValidTextWrap}>
                <span className={classes.errorValidText}>
                  * 올바른 이메일 형식을 입력해 주세요
                </span>
              </div>
            )}
            {!emptyState && !email && (
              <div className={classes.errorValidTextWrap}>
                <span className={classes.errorValidText}>
                  * 이메일을 입력해 주세요.
                </span>
              </div>
            )}
          </div>
          <div className={classes.buttonWrap}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleSubmit}
            >
              비밀번호 찾기
            </Button>
          </div>
        </div>
      </div>
      <ErrorPop
        handleClose={handleCloseError}
        openError={openError}
        errorTitle="비밀번호 찾기"
      />
    </div>
  );
}

FindMyInfo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  findMyInfo: makeSelectFindMyInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FindMyInfo);

const CollisionLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/" {...props} />
));
