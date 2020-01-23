/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import axios from 'axios';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Terms from 'components/Terms/Loadable';
import SideBar from 'containers/SideBar/Loadable';
import CalendarCheck from 'containers/CalendarCheck/Loadable';
import CoinSchedule from 'containers/CoinSchedule/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import MyPage from 'containers/MyPage/Loadable';
import MyQnA from 'containers/MyQnA/Loadable';
import MyQnADetail from 'containers/MyQnADetail/Loadable';
import MemberInfo from 'containers/MemberInfo/Loadable';
import UpdateMyInfo from 'components/UpdateMyInfo/Loadable';
import BoardPage from 'containers/BoardPage/Loadable';
import BoardPostPage from 'containers/BoardPostPage/Loadable';
import BoardPutPage from 'containers/BoardPutPage/Loadable';
import BoardDetailPage from 'containers/BoardDetailPage/Loadable';
import EmailVaildPage from 'containers/EmailVaildPage/Loadable';
import SigninPage from 'containers/SigninPage/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import ChatPage from 'containers/ChatPage/Loadable';
import Partnership from 'containers/Partnership/Loadable';
import FindMyInfo from 'containers/FindMyInfo/Loadable';
import ExpHistoryPage from 'containers/ExpHistoryPage/Loadable';
import ExcahngeListPage from 'containers/ExcahngeListPage/Loadable';
import IndexSettingPage from 'containers/IndexSettingPage/Loadable';
import HotTab from 'components/HotTab';
import NoticePop from 'components/NoticePop';
import Grid from '@material-ui/core/Grid';
// import Alink from 'components/Alink';

import {
  makeSelectSignin,
  makeSelectLocation,
  makeSelectIsPc,
} from './selectors';

import GlobalStyle from '../../global-styles';

// import CoinbitBanner from '../../images/banner/banner_coinbit.gif';
import BithumbBanner from '../../images/banner/bithumb_mobile.gif';
import GopaxBanner from '../../images/banner/gopaxpc.gif';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    // maxWidth: '100%',
    minWidth: 1400,
    flexDirection: 'column',
    margin: '0 auto',
    // backgroundColor: '#f1f1f1',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
  content: {
    flexGrow: 1,
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    paddingTop: 30,
  },
  sidebar: {
    backgroundColor: '#ffffff',
    color: theme.palette.text.secondary,
  },
  contentGrid: {
    backgroundColor: '#f1f1f1',
    [theme.breakpoints.down('xs')]: {
      marginTop: 20,
    },
  },
  footerBanner: {
    textAlign: 'center',
  },
  topBanner: {
    marginBottom: 10,
    // color: '#ffffff',
    // textAlign: 'center',
    // backgroundColor: '#ffffff',
    // border: 'solid 1px #dedede',
    // fontSize: 70,
    // fontWeight: 800,
    // backgroundColor: '#093687',
  },
  imgsize: {
    objectFit: 'fill',
    width: '100%',
    height: '100%',
  },
}));

function App({ isSignin, location, isPc }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = React.useState(true);

  function onlyAuthenticated(nextState, replace, callback) {
    // console.log('call');
    if (!isSignin) {
      replace('/');
    }
    callback();
  }

  useEffect(() => {}, [isPc]);
  const boolNotice = () => {
    const setDate = parseInt(localStorage.getItem('noticepopDay'), 0);
    // console.log(setDate);
    // console.log(new Date(setDate));
    if (setDate) {
      const dateNow = new Date();
      const dattSet = new Date(setDate);
      const diff = dateNow.valueOf() - dattSet.valueOf();
      const diffInHours = diff / 1000 / 60 / 60;
      // console.log(diffInHours);
      if (diffInHours < 2) {
        return false;
      }
    }

    return true;
  };
  return (
    <div className={classes.root}>
      {!isPc ? (
        <Helmet titleTemplate="코인놀자" defaultTitle="코인놀자">
          <meta
            name="viewport"
            content="width=device-width,height=device-height,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=yes"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="description"
            content="코인놀자, connolja, 암호화폐, 비트코인, 이더리움"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="coinnolja" />
          <meta
            property="og:description"
            content="코인놀자, connolja, 암호화폐, 비트코인, 이더리움"
          />
          <meta property="og:url" content="https://www.coinnolja.com/" />
        </Helmet>
      ) : (
        <Helmet titleTemplate="코인놀자" defaultTitle="코인놀자">
          <meta
            name="description"
            content="코인놀자, connolja, 암호화폐, 비트코인, 이더리움"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="coinnolja" />
          <meta
            property="og:description"
            content="코인놀자, connolja, 암호화폐, 비트코인, 이더리움"
          />
          <meta property="og:url" content="https://www.coinnolja.com/" />
        </Helmet>
      )}
      <Header />
      <div className={classes.content}>
        <Grid container spacing={2}>
          {!matches && (
            <Grid item xs={12} sm={3}>
              <div className={classes.sidebar}>
                <SideBar />
              </div>
            </Grid>
          )}

          <Grid item xs={12} sm={9}>
            <div className={classes.contentGrid}>
              {!matches && (
                // <Alink to="/partnership" className={classes.link}>
                //   <div className={classes.topBanner}>
                //     광고 문의{' '}
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       width="40"
                //       height="40"
                //       viewBox="0 0 24 24"
                //     >
                //       <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                //     </svg>
                //   </div>
                // </Alink>
                // <Alink to="https://www.gopax.com" className={classes.link}>
                <div className={classes.topBanner}>
                  <a href="https://www.gopax.co.kr" target="_blank">
                    <img src={GopaxBanner} alt="" className={classes.imgsize} />
                  </a>
                </div>
                // </Alink>
              )}
              {/* <MainCoinIndex /> */}
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/terms" component={Terms} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/features" component={FeaturePage} />
                <Route path="/mypage" component={MyPage} />
                <Route path="/myqna" component={MyQnA} />
                <Route path="/member/:memberId" component={MemberInfo} />
                <Route path="/qnadetail/:qnaId" component={MyQnADetail} />
                <Route path="/updateinfo" component={UpdateMyInfo} />
                <Route path="/signin" component={SigninPage} />
                <Route path="/calendarcheck" component={CalendarCheck} />
                <Route path="/coinschedule" component={CoinSchedule} />
                <Route
                  path="/board/post/:boardMasterId/:boardType"
                  component={BoardPostPage}
                />
                <Route
                  path="/board/put/:boardMasterId/:boardType/:boardId"
                  component={BoardPutPage}
                />
                <Route
                  path="/board/detail/:boardId"
                  component={BoardDetailPage}
                  onEnter={onlyAuthenticated}
                />
                <Route path="/board/:boardId" component={BoardPage} />
                <Route path="/valid" component={EmailVaildPage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/partnership" component={Partnership} />
                <Route path="/findmyinfo" component={FindMyInfo} />
                <Route path="/exphistory" component={ExpHistoryPage} />
                <Route path="/indexsetting" component={IndexSettingPage} />
                <Route
                  path="/excahngelist/:type"
                  component={ExcahngeListPage}
                />
                {matches && <Route path="/chat" component={ChatPage} />}

                <Route path="" component={NotFoundPage} />
              </Switch>
            </div>
            {matches && <HotTab />}
            {matches && location.pathname !== '/chat' && (
              <div className={classes.footerBanner}>
                <a href="https://www.bithumb.com/" target="_blank">
                  <img src={BithumbBanner} alt="" />
                </a>
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      <Footer />
      {location.pathname === '/' && open && boolNotice() && (
        <NoticePop open={setOpen} />
      )}

      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  isSignin: PropTypes.any,
  location: PropTypes.any.isRequired,
  isPc: PropTypes.any.isRequired,
};
const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
  location: makeSelectLocation(),
  isPc: makeSelectIsPc(),
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
