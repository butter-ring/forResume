/**
 *
 * SignupPage
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import SignupStep1 from 'components/SignupStep1';
import SignupStep2 from 'components/SignupStep2';
import SignupStep3 from 'components/SignupStep3';

import makeSelectSignupPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function SignupPage() {
  useInjectReducer({ key: 'signupPage', reducer });
  useInjectSaga({ key: 'signupPage', saga });

  const [step, setStep] = useState(0);
  const [username, setUsername] = useState();

  const handleStep = toStep => {
    setStep(toStep);
  };

  const signupComplete = (toStep, usernameSaved) => {
    setStep(toStep);
    setUsername(usernameSaved);
  };

  switch (step) {
    case 0:
      return <SignupStep1 handleStep={handleStep} />;
    case 1:
      return (
        // <GoogleReCaptchaProvider reCaptchaKey="6LcUqqQUAAAAAEPXQWYrZSHZrvvYgcYOBgdNa3bZ">
        <SignupStep2 signupComplete={signupComplete} handleStep={handleStep} />
        // </GoogleReCaptchaProvider>
      );
    case 2:
      return <SignupStep3 username={username} />;
    default:
      return null;
  }
}

SignupPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signupPage: makeSelectSignupPage(),
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

export default compose(
  withConnect,
  memo,
)(SignupPage);
