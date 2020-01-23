/**
 *
 * Otp
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import { findMyInfo } from '../../containers/Account/actions';
// import reducer from '../../containers/Account/reducer';
// import saga from '../../containers/Account/saga';
// import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: '#323232',
    paddingLeft: 20,
    paddingBottom: 30,
  },
});

function Otp({ findMyInfoGet }) {
  // useInjectReducer({ key: 'account', reducer });
  // useInjectSaga({ key: 'account', saga });

  useEffect(() => {
    findMyInfoGet();
  }, []);

  console.log(':::::::계정 정보:::::::::');
  console.log(findMyInfoGet);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>OTP 인증</div>
      <Divider />
      otp 페이지
    </div>
  );
}

Otp.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  findMyInfoGet: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMyInfoGet: () => {
      // dispatch(findMyInfo());
    },
  };
}

const withConnect = connect(mapDispatchToProps);

export default compose(withConnect)(Otp);
