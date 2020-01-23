/**
 *
 * CommentItemMobile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { FormattedDate } from 'react-intl';
// import CommentReplyItemMobile from 'components/CommentReplyItemMobile';
import JudgeButton from 'components/JudgeButton';
import MemberName from 'components/MemberName';
import CommentVote from 'components/CommentVote';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.2),
    borderBottom: 'solid 1px #dedede',
  },
  comment: {
    display: 'flex',
    paddingBottom: 5,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  contentWrap: {
    paddingLeft: 15,
    paddingRight: 10,
    flex: 1,
  },
  username: {
    fontSize: 12,
    fontWeight: 'bold',
    display: 'flex',
  },
  avatarWrap: {
    // flex: 1,
  },
  buttonWrap: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#a6a6a6',
    textAlign: 'right',
    paddingBottom: 5,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  buttonReply: {
    marginRight: 5,
    padding: 0,
  },
  createdAtWrap: {
    color: '#a6a6a6',
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
  },
  textArea: {
    width: '100%',
    resize: 'none',
    padding: 15,
    border: 'solid 1px #dedede',
  },
  recomment: {
    borderTop: 'dashed 1px #dedede',
    paddingTop: 10,
    paddingLeft: 16,
    paddingBottom: 10,
  },
  buttonPost: {
    marginRight: 5,
    padding: 0,
  },
  buttonMore: {
    maxWidth: 200,
    width: '100%',
    padding: 0,
  },
  more: {
    textAlign: 'center',
  },
  usernameText: {
    flex: 1,
  },
  buttonPostCancel: {
    padding: 0,
  },
}));

function CommentItemMobile({
  comment,
  isSignin,
  // handleReComments,
  handleReCommentCancel,
  openCommentBox,
  postReComment,
  content,
  setContent,
  handleReComment,
  // recommentList,
  // last,
  // page,
}) {
  const classes = useStyles();
  // console.log(openCommentBox);

  return (
    <div className={classes.root}>
      <div className={classes.comment}>
        {comment.depCount < 1 ? (
          <div className={classes.avatarWrap}>
            {comment.member && !comment.member.profileImageUrl ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z" />
          </svg>
        )}
        <div className={classes.contentWrap}>
          <div className={classes.username}>
            <div className={classes.usernameText}>
              {/* {comment.member.username}(Lv.{comment.member.memberLevel}) */}
              <MemberName member={comment.member} />
            </div>
            <div className={classes.createdAtWrap}>
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
              <FormattedDate
                value={new Date(comment.createdAt)}
                year="numeric"
              />
              -
              <FormattedDate
                value={new Date(comment.createdAt)}
                month="2-digit"
              />
              -
              <FormattedDate
                value={new Date(comment.createdAt)}
                day="2-digit"
              />
            </div>
          </div>
          <div>{comment.content}</div>
        </div>
      </div>
      {isSignin && (
        <div className={classes.buttonWrap}>
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.buttonReply}
              onClick={handleReComment}
            >
              답변
            </Button>
            <JudgeButton
              judgeCount={comment.judgeCount}
              judgeType="reply"
              judgeId={comment.id}
            />
          </div>
          <CommentVote comment={comment} />
        </div>
      )}
      {openCommentBox && (
        <div className={classes.recomment}>
          <textarea
            rows="4"
            className={classes.textArea}
            placeholder="댓글 내용을 입력해주세요."
            maxLength="500"
            onChange={e => setContent(e.target.value)}
            value={content}
          />
          <div className={classes.buttonWrap}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonPost}
              onClick={postReComment}
            >
              댓글등록
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReCommentCancel}
              className={classes.buttonPostCancel}
            >
              취소
            </Button>
          </div>
        </div>
      )}
      {/* {recommentList && recommentList.length > 0 && (
        <div className={classes.recommentList}>
          {recommentList.map(recomment => (
            <CommentReplyItemMobile comment={recomment} />
          ))}
        </div>
      )} */}
      {/* {!last && (
        <div className={classes.more}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttonMore}
            onClick={() =>
              handleReComments(comment.boardId, page + 1, comment.id)
            }
          >
            답글 더보기
          </Button>
        </div>
      )} */}
    </div>
  );
}

CommentItemMobile.propTypes = {
  comment: PropTypes.object.isRequired,
  isSignin: PropTypes.any,
  // handleReComments: PropTypes.any,
  handleReCommentCancel: PropTypes.any,
  openCommentBox: PropTypes.any,
  postReComment: PropTypes.any,
  content: PropTypes.any,
  setContent: PropTypes.any,
  handleReComment: PropTypes.func.isRequired,
  // recommentList: PropTypes.any,
  // last: PropTypes.any,
  // page: PropTypes.any,
};

export default CommentItemMobile;
