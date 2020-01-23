/**
 *
 * EmailVaildPage
 *
 */

import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import request from 'utils/request';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import SigninRequired from 'components/SigninRequired';
import { makeSelectSignin } from 'containers/App/selectors';
import { validSuccess } from 'containers/App/actions';
import makeSelectEmailVaildPage from './selectors';
import reducer from './reducer';
import saga from './saga';

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
    paddingBottom: 97,
    marginBottom: 14,
    position: 'relative',
    textAlign: 'center',
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
  button: {
    marginTop: 76,
    maxWidth: 244,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 30,
    },
  },
  blue: {
    fontWeight: 'bold',
    color: '#4d85f1',
  },
}));

export function EmailVaildPage({ history, isSignin, validSuccessAction }) {
  useInjectReducer({ key: 'emailVaildPage', reducer });
  useInjectSaga({ key: 'emailVaildPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    validEmail();
  }, [isSignin]);

  const validEmail = async () => {
    if (loading || !isSignin) {
      return false;
    }
    try {
      setLoading(true);
      const validString = history.location.search.substring(7);
      // console.log(validString);
      const options = {
        method: 'POST',
        data: {
          validString,
        },
        auth: true,
      };
      const result = await request(`/api/member/validemail`, options);
      console.log(result);
      if (result) {
        if (result.data) {
          const accessToken = result.data;
          localStorage.setItem('accessToken', accessToken);
          const base64Url = accessToken.split('.')[1];
          const decodedValue = JSON.parse(window.atob(base64Url));
          localStorage.setItem('roles', decodedValue.roles);
          validSuccessAction(decodedValue.roles);
          setValid(true);
        }
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
    return false;
  };
  if (!isSignin) {
    return <SigninRequired />;
  }
  return (
    <div className={classes.root}>
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}
      <div className={classes.contentWrap}>
        {valid && (
          <div>
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
            <div className={classes.bodyText}>
              이메일 인증이 완료 되었습니다.
            </div>
          </div>
        )}
        {error && (
          <div>
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
                  stroke="#f05c5c"
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
            <div className={classes.bodyText}>
              이메일 인증이 실패 하였습니다.
            </div>
          </div>
        )}
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

EmailVaildPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // match: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  isSignin: PropTypes.any,
  validSuccessAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  emailVaildPage: makeSelectEmailVaildPage(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    validSuccessAction: roles => {
      dispatch(validSuccess(roles));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EmailVaildPage);
const CollisionLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/" {...props} />
));
