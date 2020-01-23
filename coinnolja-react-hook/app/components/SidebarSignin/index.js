/**
 *
 * SidebarSignin
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ErrorPop from 'components/ErrorPop';
import LoadingIndicator from 'components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    border: 'solid 1px #dedede',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 24,
    paddingTop: theme.spacing(0),
  },
  inputWrap: {
    marginTop: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    // minWidth: 244,
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
}));

function SidebarSignin({ handleSignin, loading, error }) {
  const classes = useStyles();
  const [focus, setFocus] = useState();
  const [savePass, setSavePass] = useState(false);

  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  useEffect(() => {
    // console.log(localStorage.getItem('savePass'));
    // console.log(localStorage.getItem('usernameSave'));
    // console.log(localStorage.getItem('passwordSave'));
    if (localStorage.getItem('savePass') === 'true') {
      setSavePass(true);
      // console.log('========true======');
      handleSignin(
        localStorage.getItem('usernameSave'),
        localStorage.getItem('passwordSave'),
      );
    }
  }, []);

  const onSubmitFormInit = event => {
    // console.log('call');
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    if (savePass) {
      localStorage.setItem('usernameSave', username);
      localStorage.setItem('passwordSave', password);
      localStorage.setItem('savePass', 'true');
    } else {
      localStorage.removeItem('usernameSave');
      localStorage.removeItem('passwordSave');
      localStorage.removeItem('savePass');
    }
    if (username && password) {
      // console.log('dispatch');
      handleSignin(username, password);
    } else {
      setOpenError({
        open: true,
        errorCode: {
          code: 800100,
        },
      });
    }
  };

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
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

  const handleToggle = () => {
    setSavePass(!savePass);
  };
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
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
            color="primary"
            className={classes.button}
            type="submit"
          >
            로그인
          </Button>
        </div>
      </form>

      <div className={classes.linkWrap}>
        <span className={classes.signinLink}>
          <Link to="/signup">회원가입 &#62; </Link>
        </span>
        <span>
          <Link to="/findmyinfo">아이디/비밀번호 찾기 &#62; </Link>
        </span>
      </div>
      <div className={classes.linkWrap}>
        <input
          type="checkbox"
          checked={savePass && true}
          onChange={e => setSavePass(e.target.checked)}
        />{' '}
        <span onClick={handleToggle} role="presentation">
          아이디/패스워드 저장하기
        </span>
      </div>

      {openError.open && (
        <ErrorPop
          handleClose={handleCloseError}
          openError={openError}
          errorTitle="로그인"
        />
      )}
    </div>
  );
}

SidebarSignin.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,
  // isSignin: PropTypes.any,
};

export default memo(SidebarSignin);
