/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeStyles } from '@material-ui/styles';

import NoticeLine from 'components/NoticeLine';
import BoardTabList from 'components/BoardTabList';
import BoardTabImage from 'components/BoardTabImage';
import TopBanner from 'components/TopBanner';
import MainCoinIndex from 'components/MainCoinIndex';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import reducer from './reducer';
import saga from './saga';

const key = 'home';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddinTop: theme.spacing(0),
  },
}));

export function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <MainCoinIndex />
      <NoticeLine />

      <BoardTabList />
      <TopBanner />
      <BoardTabImage />
    </div>
  );
}

HomePage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
