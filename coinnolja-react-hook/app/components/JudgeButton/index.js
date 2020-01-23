/**
 *
 * JudgeButton
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import { makeSelectSignin } from 'containers/App/selectors';
import ErrorPop from 'components/ErrorPop';
import request from 'utils/request';

const useStyles = makeStyles(theme => ({
  judge: {
    padding: 25,
    borderTop: 'solid 1px #dedede',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 10,
      paddingBottom: 5,
      paddingLeft: 25,
    },
  },
  judgeButton: {
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
}));

function JudgeButton({ judgeCount, judgeType, judgeId, isSignin }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });
  const [judge, setJudge] = useState(0);

  useEffect(() => {
    if (judgeCount) {
      setJudge(judgeCount);
    }
  }, [judgeCount]);
  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  const handleJudge = async () => {
    if (loading || !isSignin) {
      return false;
    }

    try {
      setLoading(true);
      let data = {
        boardId: judgeId,
      };
      if (judgeType === 'reply') {
        data = {
          replyId: judgeId,
        };
      }
      const options = {
        method: 'POST',
        data,
        auth: true,
      };
      const result = await request(`/api/judge/${judgeType}`, options);
      if (result) {
        if (result.data) {
          console.log(result.data);
          setJudge(result.data);
        }
      }
    } catch (err) {
      console.log(err.response.data);
      // setError(true);
      setOpenError({
        open: true,
        errorCode: err.response.data,
      });
    } finally {
      setLoading(false);
    }
    return false;
  };
  console.log(matches);
  return (
    <div>
      <Button
        variant="outlined"
        // color="primary"
        className={classes.judgeButton}
        onClick={handleJudge}
      >
        신고 {judge}
      </Button>
      <ErrorPop
        handleClose={handleCloseError}
        openError={openError}
        errorTitle="신고"
      />
    </div>
  );
}

JudgeButton.propTypes = {
  isSignin: PropTypes.any,
  judgeCount: PropTypes.number.isRequired,
  judgeType: PropTypes.string.isRequired,
  judgeId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});
// export default JudgeButton;
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(JudgeButton);
