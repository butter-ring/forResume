/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { makeSelectUsername } from './selectors';
import { findAllCoinMarkets } from './actions';
import reducer from './reducer';
import saga from './saga';
import CoinMarkets from 'components/CoinMarkets';
import SwiperSlide from 'components/SwiperSlide';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const key = 'home';

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  swiperslide: {
    // marginLeft: 50,
    // marginRight: 50,
    marginTop: 30,
  },
  coinmarket: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  appBar: {
    // textAlign: 'center',
    width: 1300,
    backgroundColor: '#242936',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: 'white',
  },
  aaa: {
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    fontSize: 13,
  },
}));

export function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    // findAllCoinMarketsGet(value);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.coinmarket}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} onChange={handleChange} className={classes.tabs}>
            <Tab label="KRW" className={classes.tabs} />
            <Tab label="USD" className={classes.tabs} />
            <Tab label="BTC" className={classes.tabs} />
          </Tabs>
        </AppBar>
        <CoinMarkets coinMarket={home.home && home.home.body} value={value} />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  home: PropTypes.any,
  findAllCoinMarketsGet: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  home: makeSelectHome(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findAllCoinMarketsGet: value => {
      dispatch(findAllCoinMarkets(value));
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
)(HomePage);
