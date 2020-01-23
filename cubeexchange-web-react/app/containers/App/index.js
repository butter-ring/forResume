/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import withRoot from 'withRoot';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import Wallet from 'containers/Wallet/Loadable';
import Exchange from 'containers/Exchange/Loadable';
import Sample from 'containers/Sample/Loadable';
import History from 'containers/History/Loadable';
import Notice from 'containers/Notice/Loadable';
import Signin from 'components/Signin/Loadable';
import Deposit from 'components/Deposit/Loadable';
import Otp from 'components/Otp/Loadable';
import Account from 'containers/Account/Loadable';
import EmailVaildPage from 'containers/EmailVaildPage/Loadable';
import OrderBookPage from 'containers/OrderBookPage/Loadable';
import Header from 'components/Header';
// import Footer from 'components/Footer';
import Grid from '@material-ui/core/Grid';
import { makeSelectSignin } from './selectors';
import GlobalStyle from '../../global-styles';

const useStyles = makeStyles(theme => ({
  approot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  content: {
    flexGrow: 1,
    marginTop: 70, // 헤더 높이 *매우 중요*
    width: '100%',
  },
  leftSide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export function App(isSignin) {
  const classes = useStyles();

  console.log(`App.js isSignin${isSignin.isSignin}`);

  return (
    <div className={classes.approot}>
      <Header />
      <div className={classes.content}>
        <Grid container spacing={0}>
          {/* <Grid item xs={12} sm={3} className={classes.leftSide}>
            <div className={classes.paper}>xs=12</div>
          </Grid> */}
          {/* <Grid item xs={12} sm={9}> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/signin" component={Signin} />
            <Route path="/valid" component={EmailVaildPage} />
            <Route path="/account" component={Account} />
            <Route path="/wallet" component={Wallet} />
            <Route path="/exchange" component={Exchange} />
            <Route path="/sample" component={Sample} />
            <Route path="/history" component={History} />
            <Route path="/notice" component={Notice} />
            <Route path="/features" component={FeaturePage} />
            <Route path="/orderbookpage" component={OrderBookPage} />
            <Route path="/otp" component={Otp} />
            <Route path="/deposit" component={Deposit} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Grid>
      </div>
      {/* <Footer /> */}
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);

axios.interceptors.response.use(
  response =>
    // Do something with response data
    // console.log(response);
    response,
  error => {
    console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);
    }
    if (error.response.status === 401) {
      // doRefreshToken();
      // console.log(error);
      // console.log(window.location.pathname);
      // console.log('axios interceptors.');
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('username');
      // if (window.location.pathname !== '/') {
      //   window.location.href = '/';
      // }
      // browserHistory.push('/signin');
      // window.location.href = '/signin';
    }
    // console.log(error.config);
    return Promise.reject(error);
  },
);
