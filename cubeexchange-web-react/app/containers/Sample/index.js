/**
 *
 * Sample
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSignin } from 'containers/App/selectors';
import { sampleFindAll } from './actions';
import makeSelectSample from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Sample({ sample, sampleFindAllGet, isSignin, history }) {
  useInjectReducer({ key: 'sample', reducer });
  useInjectSaga({ key: 'sample', saga });

  if (isSignin !== true) {
    history.push('/');
  }

  console.log('index.js sample check');
  console.log(sample.sample);

  useEffect(() => {
    sampleFindAllGet();
  }, []);

  return <div>로그인 성공</div>;
}

Sample.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  sample: PropTypes.any,
  sampleFindAllGet: PropTypes.func,
  history: PropTypes.any,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  sample: makeSelectSample(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    sampleFindAllGet: () => {
      dispatch(sampleFindAll());
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
)(Sample);
