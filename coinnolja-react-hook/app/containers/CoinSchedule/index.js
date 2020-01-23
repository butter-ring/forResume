/**
 *
 * CoinSchedule
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import CoinScheduleComp from 'components/CoinScheduleComp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { coinScheduleGet } from './actions';
import makeSelectCoinSchedule from './selectors';
import reducer from './reducer';
import saga from './saga';
import './App.css';

const useStyles = makeStyles({
  rectangle28: {
    // width: 896,
    // height: 1576,
    backgroundColor: '#ffffff',
    borderColor: '#dedede',
    border: '1px solid',
    // borderWidth: 1,
  },
  attendCheck: {
    width: 256,
    height: 41,
    marginTop: 22,
    marginLeft: 37,
    marginBottom: 21,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },
}); // END userStyles

export function CoinSchedule({ coinSchedule, CoinScheduleGet }) {
  useInjectReducer({ key: 'coinSchedule', reducer });
  useInjectSaga({ key: 'coinSchedule', saga });

  const classes = useStyles();

  // console.log('============coinSchedule========');
  // console.log(coinSchedule.coinschedule);

  useEffect(() => {
    CoinScheduleGet();
  }, []);
  return (
    <React.Fragment>
      <div className={classes.rectangle28}>
        <List>
          <div className={classes.attendCheck}>코인일정</div>
          <Divider />
          <div className="App">
            <main>
              <CoinScheduleComp
                listNameFromParent={coinSchedule.coinschedule}
              />
            </main>
            <br />
          </div>
        </List>
      </div>
    </React.Fragment>
  );
}

CoinSchedule.propTypes = {
  CoinScheduleGet: PropTypes.any,
  coinSchedule: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  coinSchedule: makeSelectCoinSchedule(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    CoinScheduleGet: () => {
      dispatch(coinScheduleGet());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CoinSchedule);
