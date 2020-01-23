/**
 *
 * Notice
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotice from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Notice() {
  useInjectReducer({ key: 'notice', reducer });
  useInjectSaga({ key: 'notice', saga });

  return <div>공지사항</div>;
}

Notice.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notice: makeSelectNotice(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Notice);
