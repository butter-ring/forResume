/**
 *
 * SigninPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SidebarSignin from 'components/SidebarSignin';
import {
  makeSelectSignin,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { signin } from 'containers/App/actions';
import saga from 'containers/SideBar/saga';
import makeSelectSigninPage from './selectors';
import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
  },
}));

export function SigninPage({
  signinAction,
  loading,
  error,
  isSignin,
  history,
}) {
  useInjectReducer({ key: 'signinPage', reducer });
  useInjectSaga({ key: 'signinPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const handleSignin = (username, password) => {
    if (username && password) {
      const signToken = Buffer.from(`${username}:${password}`).toString(
        'base64',
      );
      console.log(signToken);
      signinAction(signToken);
    }
  };

  useEffect(() => {
    if (isSignin) {
      history.push('/');
    }
  }, [isSignin]);

  const signinProps = {
    loading,
    error,
    isSignin,
    handleSignin,
  };

  return (
    <div className={classes.root}>
      {matches && <SidebarSignin {...signinProps} />}
    </div>
  );
}

SigninPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isSignin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  signinAction: PropTypes.func,
  history: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signinPage: makeSelectSigninPage(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
)(SigninPage);
