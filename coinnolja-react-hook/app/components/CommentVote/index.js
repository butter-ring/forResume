/**
 *
 * CommentVote
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectSignin } from 'containers/App/selectors';
import ErrorPop from 'components/ErrorPop';
import request from 'utils/request';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';

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
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  upButton: {
    marginRight: 2,
  },
}));
function CommentVote({ comment, isSignin }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);

  const [downVoteCount, setDownVoteCount] = useState(0);

  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });

  useEffect(() => {
    console.log(matches);
    if (comment) {
      setUpVoteCount(comment.upVoteCount);
      setDownVoteCount(comment.downVoteCount);
    }
  }, [comment]);
  // console.log(comment);
  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  const handleVote = async voteTypeSend => {
    if (loading || !isSignin || !comment) {
      return false;
    }

    try {
      setLoading(true);
      console.log(comment.id);
      const options = {
        method: 'POST',
        data: {
          voteType: voteTypeSend,
          replyId: comment.id,
        },
        auth: true,
      };
      const result = await request(`/api/votereply`, options);
      // console.log(result);
      if (result) {
        if (result.data) {
          const { voteType, voteCount } = result.data;
          if (voteType === 'UP') {
            setUpVoteCount(voteCount);
          } else {
            setDownVoteCount(voteCount);
          }
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
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classNames(classes.judgeButton, classes.upButton)}
        onClick={() => handleVote('UP')}
      >
        추천 {upVoteCount}
      </Button>
      <Button
        variant="outlined"
        className={classes.judgeButton}
        onClick={() => handleVote('DOWN')}
      >
        비추천 {downVoteCount}
      </Button>
      <ErrorPop
        handleClose={handleCloseError}
        openError={openError}
        errorTitle="추천"
      />
    </div>
  );
}

CommentVote.propTypes = {
  comment: PropTypes.any,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});
const withConnect = connect(mapStateToProps);
// export default CommentVote;
export default compose(withConnect)(CommentVote);
