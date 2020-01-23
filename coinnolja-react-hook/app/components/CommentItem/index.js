/**
 *
 * CommentItem
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import classNames from 'classnames';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { FormattedDate } from 'react-intl';
import request from 'utils/request';
// import CommentReplyItem from 'components/CommentReplyItem';
import CommentItemMobile from 'components/CommentItemMobile';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';

import JudgeButton from 'components/JudgeButton';
import MemberName from 'components/MemberName';
import { findMypageById } from 'containers/MyPage/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/MyPage//reducer';
import saga from 'containers/MyPage/saga';
import CommentVote from 'components/CommentVote';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 38,
    paddingRight: 25,

    borderBottom: 'solid 1px #dedede',
  },
  comment: {
    display: 'flex',
    paddingBottom: 20,
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
    paddingBottom: 20,
  },
  buttonPost: {
    marginRight: 5,
  },
  buttonMore: {
    maxWidth: 200,
    width: '100%',
    padding: 0,
  },
  more: {
    textAlign: 'center',
  },
  voteButton: {
    marginBottom: 8,
  },
  indicator: {
    width: 20,
    height: 20,
    borderBottom: 'solid 2px #eaeaea',
    borderLeft: 'solid 2px #eaeaea',
    marginRight: 10,
  },
  commentFirst: {
    backgroundColor: '#f1f1f1',
  },
}));

function CommentItem({
  comment,
  isSignin,
  findMypageByIdGet,
  handleComment,
  page,
  userData,
}) {
  useInjectReducer({ key: 'commentItem', reducer });
  useInjectSaga({ key: 'commentItem', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentEditBox, setOpenCommentEditBox] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [page, setPage] = React.useState(-1);
  // const [recommentList, setRecommentList] = React.useState([]);
  // const [last, setLast] = React.useState(true);

  const handleReComment = () => {
    console.log('call openBox');
    setOpenCommentBox(true);
    setOpenCommentEditBox(false);
  };
  const handleReCommentCancel = () => {
    console.log('call openBox cancel');
    setOpenCommentBox(false);
  };

  function handleReCommentEdit(editcontent) {
    console.log(`call openBoxEdit${editcontent}`);
    setContent(editcontent);
    setOpenCommentEditBox(true);
    setOpenCommentBox(false);
  }

  const handleReCommentEditCancel = () => {
    console.log('call openBoxEdit cancel');
    setOpenCommentEditBox(false);
  };

  // const postReCommentEdit = () => {
  //   console.log('call postReCommentEdit');
  //   //  console.log(contente);
  //   setContent(contentEdit);
  //   console.log(content);
  //   if (content) {
  //     postReComment('edit');
  //   }
  // };
  // if (!loading) {
  //   setLoading(true);
  //   setContent(contente);
  //   setLoading(false);
  // }
  // setOpenCommentEditBox(false);

  function sameid() {
    if (userData.userId === String(comment.member.id)) {
      return true;
    }
    return false;
  }

  const postReComment = async path => {
    if (!content) {
      return false;
    }
    if (!loading) {
      setLoading(true);
      const options = {
        method: 'POST',
        data: {
          content,
          parentId: comment.id,
          boardId: comment.boardId,
        },
        auth: true,
      };
      const result = await request(`/api/reply/${path}`, options);
      // console.log(result);
      if (result) {
        setContent('');
        // setContentEdit('');
        handleReCommentCancel();
        handleReCommentEditCancel();
        handleComment(comment.boardId, page);
        // handleComments(comment.boardId, 0, comment.id);
        findMypageByIdGet();
      }
      setLoading(false);
    }
    return true;
  };
  // const handleReComments = async (boardId, pageIndex, parentId) => {
  //   if (!loading) {
  //     setLoading(true);
  //     const options = {
  //       method: 'GET',
  //     };
  //     const result = await request(
  //       `/api/reply/${boardId}?page=${pageIndex}&parentId=${parentId}`,
  //       options,
  //     );
  //     // console.log(result);
  //     if (result) {
  //       setContent('');
  //       if (result.data.content.length > 0) {
  //         if (result.data.pageable.pageNumber < 1) {
  //           setRecommentList(result.data.content);
  //         } else {
  //           setRecommentList(recommentList.concat(result.data.content));
  //         }
  //         setPage(result.data.pageable.pageNumber);
  //         setLast(result.data.last);
  //       }
  //     }
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    if (comment) {
      // if (page < 0 && comment.childCount > 0) {
      //   handleReComments(comment.boardId, 0, comment.id);
      // }
    }
  }, [comment]);

  if (matches) {
    return (
      <CommentItemMobile
        isSignin={isSignin}
        comment={comment}
        // handleReComments={handleReComments}
        handleReCommentCancel={handleReCommentCancel}
        openCommentBox={openCommentBox}
        postReComment={postReComment}
        content={content}
        setContent={setContent}
        handleReComment={handleReComment}
        page={page}
        // recommentList={recommentList}
        // last={last}
        // page={page}
      />
    );
  }
  return (
    <div className={classes.root} id={`comment_${comment.id}`}>
      <div
        className={classNames(
          classes.comment,
          comment.depCount === 1 && classes.commentFirst,
        )}
      >
        {comment.depCount > 0 && (
          <div
            className={classes.indicator}
            style={{
              marginLeft: comment.depCount * 15,
            }}
          />
        )}

        {comment.depCount < 1 && (
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
        )}

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
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonReply}
                onClick={handleReComment}
              >
                답변1
              </Button>
              <JudgeButton
                judgeCount={comment.judgeCount}
                judgeType="reply"
                judgeId={comment.id}
              />
            </div>
          )}
          {isSignin && sameid() && (
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonReply}
                onClick={() => handleReCommentEdit(comment.content)}
              >
                수정
              </Button>
            </div>
          )}
        </div>
      </div>

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
            >
              취소
            </Button>
          </div>
        </div>
      )}
      {openCommentEditBox && (
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
              onClick={() => postReComment('edit')}
            >
              댓글수정
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReCommentEditCancel}
            >
              취소
            </Button>
          </div>
        </div>
      )}
      {/* {recommentList && recommentList.length > 0 && (
        <div className={classes.recommentList}>
          {recommentList.map(recomment => (
            <CommentReplyItem comment={recomment} />
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

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  isSignin: PropTypes.any,
  page: PropTypes.any,
  findMypageByIdGet: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
  userData: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMypageByIdGet: () => {
      dispatch(findMypageById());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
// export default CommentItem;
export default compose(withConnect)(CommentItem);
