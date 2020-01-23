import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/App/reducer';
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  footerWrapper: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#11131a',
    // left: 0,
  },
  root: {
    // flexGrow: 1,
    paddingTop: 30,
  },
  topDivWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    marginTop: 40,
  },
  basicText: {
    fontSize: 14,
    letterSpacing: 1.17,
    color: '#6d717a',
    textAlign: 'center',
  },
});

// function Footer({ loadMobileAction }) {
function Footer() {
  useInjectReducer({ key: 'footer', reducer });

  const classes = useStyles();
  // const classesm = useStylesm();

  return (
    <div className={classes.footerWrapper}>
      {isMobile && (
        <Button
        // variant="outlined"
        // onClick={loadMobileAction}
        // classes={{
        //   root: classesm.layoutButton,
        // }}
        >
          모바일에 최적화된 화면으로 보기
        </Button>
      )}
      {!isMobile && (
        <div className={classes.root}>
          <Typography className={classes.basicText}>
            E-mail:help&#x00040;Jopax.com
          </Typography>
          <Typography className={classes.basicText}>
            Copyright&#x000A9; Jopax All Rights Reserved.
          </Typography>
        </div>
      )}
    </div>
  );
}

Footer.propTypes = {
  // loadMobileAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // isSignin: makeSelectSignin(),
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
export default compose(withConnect)(Footer);
