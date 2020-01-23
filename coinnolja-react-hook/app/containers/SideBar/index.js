/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import SidebarSignin from 'components/SidebarSignin';
import MainMyInfo from 'components/MainMyInfo';
import TrollBox from 'components/TrollBox';
import HotTab from 'components/HotTab';
import SideBanner from 'components/SideBanner';

import {
  makeSelectSignin,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { signin } from 'containers/App/actions';
import makeSelectSideBar from './selectors';

import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
}));

export function SideBar({ signinAction, loading, error, isSignin }) {
  useInjectReducer({ key: 'sideBar', reducer });
  useInjectSaga({ key: 'sideBar', saga });
  const classes = useStyles();

  const handleSignin = (username, password) => {
    if (username && password) {
      const signToken = Buffer.from(`${username}:${password}`).toString(
        'base64',
      );

      signinAction(signToken);
    }
  };

  const signinProps = {
    loading,
    error,
    isSignin,
    handleSignin,
  };

  return (
    <div className={classes.root}>
      {isSignin ? (
        <MainMyInfo {...signinProps} />
      ) : (
        <SidebarSignin {...signinProps} />
      )}

      <TrollBox isSignin={isSignin} />
      <HotTab />
      <SideBanner />
    </div>
  );
}

SideBar.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isSignin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  signinAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sideBar: makeSelectSideBar(),
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
)(SideBar);
