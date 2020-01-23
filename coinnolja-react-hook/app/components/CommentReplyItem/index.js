/**
 *
 * CommentReplyItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import { FormattedDate } from 'react-intl';
import JudgeButton from 'components/JudgeButton';
import MemberName from 'components/MemberName';
import { makeSelectSignin } from 'containers/App/selectors';
import CommentVote from 'components/CommentVote';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 28,
    // paddingRight: 25,
    borderTop: 'dashed 1px #dedede',
    // display: 'flex',
  },
  comment: {
    display: 'flex',
    paddingBottom: 20,
    paddingLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  contentWrap: {
    paddingLeft: 15,
    paddingRight: 10,
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarWrap: {
    // flex: 1,
  },
  buttonWrap: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#a6a6a6',
  },
  buttonReply: {
    marginRight: 5,
  },
  createdAt: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  clock: {
    marginRight: 5,
  },
  buttons: {
    // paddingTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textArea: {
    width: '100%',
    resize: 'none',
    padding: 15,
    border: 'solid 1px #dedede',
  },
  recomment: {
    borderTop: 'dashed 1px #dedede',
    paddingTop: 25,
    paddingLeft: 75,
  },
  buttonPost: {
    marginRight: 5,
  },
  indicator: {
    width: 20,
    height: 20,
    borderBottom: 'solid 2px #eaeaea',
    borderLeft: 'solid 2px #eaeaea',
    marginRight: 10,
  },
  voteButton: {
    marginBottom: 10,
  },
}));
function CommentReplyItem({ comment, isSignin }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <div className={classes.head}>
        <div className={classes.indicator} />
      </div> */}
      <div className={classes.comment}>
        <div className={classes.indicator} />
        <div className={classes.avatarWrap}>
          {comment.member && !comment.member.profileImageUrl ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 22 22"
            >
              <g fill="none" fillRule="evenodd">
                <circle cx="11" cy="11" r="11" fill="#E9E9E9" />
                <path
                  fill="#A6A6A6"
                  d="M18.314 16.5a9.1 9.1 0 0 0 1.853-5.515c0-5.05-4.108-9.152-9.167-9.152-5.06 0-9.167 4.101-9.167 9.152 0 2.07.69 3.98 1.852 5.513.34-.376.874-.674 1.708-.866 1.687-.384 2.813-.695 3.064-1.25.102-.226.051-.522-.156-.904-1.598-2.941-1.902-5.525-.859-7.276C8.153 5.012 9.45 4.33 11 4.33c1.537 0 2.826.673 3.533 1.846 1.043 1.73.747 4.322-.833 7.3-.204.385-.253.683-.15.91.255.556 1.37.864 3.057 1.247.833.192 1.366.491 1.707.868"
                />
              </g>
            </svg>
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={comment.member.profileImageUrl}
              className={classes.avatar}
            />
          )}
        </div>
        <div className={classes.contentWrap}>
          <div className={classes.username}>
            {/* {comment.member.username}(Lv.{comment.member.memberLevel}) */}
            <MemberName member={comment.member} />
          </div>
          <div>{comment.content}</div>
        </div>
        <div className={classes.buttonWrap}>
          <div className={classes.createdAt}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className={classes.clock}
            >
              <path
                fill="#A6A6A6"
                fillRule="evenodd"
                d="M10.5 8.167H6.417V3.5h1.166V7H10.5v1.167zM0 7a7 7 0 1 0 14 0A7 7 0 0 0 0 7zm7 6A6 6 0 1 0 7 1a6 6 0 0 0 0 12z"
              />
            </svg>
            <FormattedDate value={new Date(comment.createdAt)} year="numeric" />
            -
            <FormattedDate
              value={new Date(comment.createdAt)}
              month="2-digit"
            />
            -
            <FormattedDate value={new Date(comment.createdAt)} day="2-digit" />
          </div>

          {isSignin && (
            <div className={classes.voteButton}>
              <CommentVote comment={comment} />
            </div>
          )}
          {isSignin && (
            <div className={classes.buttons}>
              <JudgeButton
                judgeCount={comment.judgeCount}
                judgeType="reply"
                judgeId={comment.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CommentReplyItem.propTypes = {
  comment: PropTypes.object.isRequired,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});

const withConnect = connect(mapStateToProps);

// export default CommentReplyItem;
export default compose(withConnect)(CommentReplyItem);
