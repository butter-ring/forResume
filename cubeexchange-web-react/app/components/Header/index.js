import React from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { signout } from 'containers/App/actions';
import { makeStyles } from '@material-ui/styles';
import {
  makeSelectSignin,
  makeSelectOtpActive,
} from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import saga from 'containers/App/saga';
// import history from 'utils/history';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LogoImage from '../../images/ntopazlogo.svg';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    // flexGrow: 1,
    // height: '100%',
    // width: '100%',
    // paddingTop: theme.spacing.unit * 20,
    // paddingTop: theme.spacing.unit * 1,
    // paddingBottom: theme.spacing.unit * 1,
  },
  appBar: {
    height: 70,
    backgroundColor: '#ffffff',
  },

  grow: {
    flexGrow: 1,
  },

  bannerWrap: {
    textAlign: 'left',
  },
  bannerImg: {
    maxWidth: 300,
    margin: 0,
    paddingBottom: theme.spacing(1),
  },
  buttonWrap: {
    // flexGrow: 1,
    margin: 10,
  },
  link: {
    color: '#333333',
    fontSize: '1.4rem',
    textDecoration: 'none',
    marginRight: 20,
    '&:hover': {
      color: '#4183c4',
    },
  },
  linkin: {
    color: '#ffffff',
    fontSize: '1.4rem',
    textDecoration: 'none',
  },
  linkbutton: {
    color: '#ffffff',
    fontSize: '1.4rem',

    float: 'right',
    textDecoration: 'none',
    border: 'solid 1px #ffba32',
    borderRadius: 3,
    marginTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 20,
    width: 'auto',
    minWidth: 'auto',
    '&:hover': {
      border: 'solid 2px gray',
    },
  },
  logo: {
    marginRight: 70,
    width: 98.5,
    height: 16,
  },
  cube: {
    paddingLeft: 20,
    fontSize: 23,
    paddingRight: 40,
    color: '#f09614',
    fontWeight: 'bold',
    marginRight: 10,
  },
  menuButton: {
    fontSize: '1.4rem',
  },
}));

function Header({ signoutAction, isSignin, otpActive }) {
  const classes = useStyles();
  useInjectReducer({ key: 'signin', reducer });
  useInjectSaga({ key: 'signin', saga });

  const handleSignout = () => {
    console.log('::::::::: logout ::::::::');
    signoutAction();
  };

  console.log(`::::::::: isSignin,otpActive ::::::::${isSignin}`, otpActive);

  // useEffect(() => {
  //   if ((isSignin === false || isSignin === null) && otpActive === null) {
  //     console.log('::::::::: 접근금지!! ::::::::');
  //     history.push('/');
  //   }
  // }, [isSignin, otpActive]);

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.buttonWrap}>
          <Link to="/" className={classes.link}>
            <img src={LogoImage} className={classes.logo} alt="logo" />
            {/* <span className={classes.cube}>CUBE Exchange</span> */}
          </Link>
          {/* {isSignin ? (
            <Button
              color="inherit"
              className={classes.link}
              onClick={handleSignout}
            >
              로그아웃
            </Button>
          ) : (
            <Link to="/signin" className={classes.link}>
              <Button color="inherit">로그인</Button>
            </Link>
          )}
          {!isSignin && (
            <Link to="/signup" className={classes.link}>
              <Button color="inherit">회원가입</Button>
            </Link>
          )} */}
          <Link to="/exchange" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>
              FEED
            </Button>
          </Link>
          <Link to="/history" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>
              CONTESTS
            </Button>
          </Link>
          <Link to="/wallet" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>
              EVENT
            </Button>
          </Link>
          <Link to="/notice" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>
              nTOPAZ
            </Button>
          </Link>
          <Link to="/notice" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>
              FAQ
            </Button>
          </Link>
          {/* {isSignin && (
            <Link to="/account" className={classes.link}>
              <Button color="inherit">계정관리</Button>
            </Link>
          )} */}
          {isSignin ? (
            <Link to="/account" className={classes.linkin}>
              <Button color="inherit" className={classes.linkbutton}>
                계정관리
              </Button>
            </Link>
          ) : (
            <Link to="/signup" className={classes.linkin}>
              <Button color="inherit" className={classes.linkbutton}>
                회원가입
              </Button>
            </Link>
          )}
          {isSignin ? (
            <Button
              color="inherit"
              className={classes.linkbutton}
              onClick={handleSignout}
            >
              로그아웃
            </Button>
          ) : (
            <Link to="/signin" className={classes.linkin}>
              <Button color="inherit" className={classes.linkbutton}>
                로그인
              </Button>
            </Link>
          )}
        </div>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  signoutAction: PropTypes.func,
  isSignin: PropTypes.any,
  otpActive: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
  otpActive: makeSelectOtpActive(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutAction: () => {
      dispatch(signout());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default Header;
export default compose(withConnect)(Header);
