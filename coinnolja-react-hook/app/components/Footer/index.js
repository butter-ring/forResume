import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
// import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import { loadPc, loadMobile, signout } from 'containers/App/actions';
import { makeSelectSignin } from 'containers/App/selectors';

import Button from '@material-ui/core/Button';
import Alink from 'components/Alink';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    marginTop: theme.spacing(1.5),
  },
  root: {
    paddingTop: theme.spacing(0),
  },
  topDivWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: '#4d85f1',
    marginTop: 40,
  },

  linkWrapper: {
    paddingTop: 15,
    textAlign: 'center',
  },
  askAllianceLink: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    color: '#ffffff',
    paddingRight: 40,
  },
  askStopPostsLink: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    color: '#ffffff',
    paddingRight: 40,
  },
  termsLink: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    color: '#ffffff',
    textDecoration: 'none',
  },
  bottomDivWrapper: {
    width: '100%',
    // height: 120,
    // backgroundColor: '#3b69c1',
    backgroundColor: '#093687',
    textAlign: 'center',
  },
  emailCopyrightWrapper: {
    paddingTop: 21,
    fontFamily: 'NotoSansCJKkr',
    color: '#ffffff',
    paddingBottom: 20,
  },
  emailText: {
    fontSize: 14,
    letterSpacing: 1.17,
  },
  welcomeText: {
    fontSize: 14,
    letterSpacing: 1.17,
    paddingBottom: 10,
  },
  copyrightText: {
    fontSize: 14,
    letterSpacing: 1.17,
  },
  layoutButton: {
    color: '#ffffff',
    borderColor: '#ffffff',
    fontSize: 75,
    fontWeight: 'bold',
    // padding: 0,
  },
}));

const useStylesm = makeStyles(theme => ({
  footerWrapper: {
    marginTop: theme.spacing(1.5),
  },
  root: {
    paddingTop: theme.spacing(0),
    marginTop: theme.spacing(1.5),
  },
  topDivWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: '#477ce2',
  },

  linkWrapper: {
    paddingTop: 16,
    textAlign: 'center',
  },
  termsLink: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textDecoration: 'none',
  },
  bottomDivWrapper: {
    width: '100%',
    height: 167,
    // backgroundColor: '#3b69c1',
    backgroundColor: '#093687',
    textAlign: 'center',
  },
  emailCopyrightWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'NotoSansCJKkr',
    color: '#ffffff',
  },
  emailText: {
    fontSize: 14,
    letterSpacing: 1.17,
  },
  welcomeText: {
    fontSize: 14,
    letterSpacing: 1.17,
  },
  copyrightText: {
    fontSize: 14,
    letterSpacing: 1.17,
    paddingBottom: 10,
  },
  layoutButton: {
    color: '#ffffff',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#ffffff',
    margin: 4,
  },
}));

function Footer({ loadPcAction, loadMobileAction, signoutAction, isSignin }) {
  useInjectReducer({ key: 'footer', reducer });

  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  // console.log(`isMobile === ${isMobile}`);
  // console.log(`isBrowser === ${isBrowser}`);
  if (matches) {
    return (
      <div className={classesm.footerWrapper}>
        {/* <div className={classesm.topDivWrapper}>
          <div className={classesm.linkWrapper}>
            <Link to="/terms" className={classesm.termsLink}>
              이용약관 및 개인정보취급방침
            </Link>
          </div>
        </div> */}
        <div className={classesm.bottomDivWrapper}>
          <div className={classesm.emailCopyrightWrapper}>
            <div>
              <Alink to="/mypage" className={classes.link}>
                <Button
                  variant="outlined"
                  // onClick={loadPcAction}
                  classes={{
                    root: classesm.layoutButton,
                  }}
                >
                  회원정보 보기
                </Button>
              </Alink>
              {isSignin && (
                <Button
                  variant="outlined"
                  onClick={signoutAction}
                  classes={{
                    root: classesm.layoutButton,
                  }}
                >
                  로그아웃
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={loadPcAction}
                classes={{
                  root: classesm.layoutButton,
                }}
              >
                PC
              </Button>
            </div>
            <Typography className={classesm.emailText}>
              E-mail:help&#x00040;coinnolja.com
            </Typography>
            <Typography className={classesm.copyrightText}>
              Copyright&#x000A9; 코인놀자 All Rights Reserved.
            </Typography>
            <Typography className={classesm.welcomeText}>
              안녕하세요 코인놀자입니다
            </Typography>
            <Typography className={classesm.welcomeText}>
              코인놀자에 방문해주셔서 감사합니다
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.footerWrapper}>
      {/* <div className={classes.topDivWrapper}>
        <div className={classes.linkWrapper}>
          <Link to="/terms" className={classes.termsLink}>
            이용약관 및 개인정보취급방침
          </Link>
        </div>
      </div> */}

      <div className={classes.bottomDivWrapper}>
        <div className={classes.emailCopyrightWrapper}>
          {isMobile && (
            <Button
              // variant="outlined"
              onClick={loadMobileAction}
              classes={{
                root: classes.layoutButton,
              }}
            >
              모바일에 최적화된 화면으로 보기
            </Button>
          )}
          {!isMobile && (
            <div>
              <Typography className={classes.welcomeText}>
                안녕하세요 코인놀자입니다 코인놀자에 방문해주셔서 감사합니다
              </Typography>
              <Typography className={classes.emailText}>
                E-mail:help&#x00040;coinnolja.com
              </Typography>
              <Typography className={classes.copyrightText}>
                Copyright&#x000A9; 코인놀자 All Rights Reserved.
              </Typography>
            </div>
          )}

          {/* <Typography className={classes.emailText}>
            E-mail:help&#x00040;coinnolja.com
          </Typography>
          <Typography className={classes.copyrightText}>
            Copyright&#x000A9; 코인놀자 All Rights Reserved.
          </Typography> */}
        </div>
      </div>
    </div>
  );
}

// export default Footer;
Footer.propTypes = {
  loadPcAction: PropTypes.func.isRequired,
  loadMobileAction: PropTypes.func.isRequired,
  signoutAction: PropTypes.func.isRequired,
  isSignin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadPcAction: () => {
      dispatch(loadPc());
    },
    loadMobileAction: () => {
      dispatch(loadMobile());
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
// export default CommentItem;
export default compose(withConnect)(Footer);
