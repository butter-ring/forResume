/**
 *
 * CommentList
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import request from 'utils/request';
import Button from '@material-ui/core/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import CommentItem from 'components/CommentItem';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectSignin } from 'containers/App/selectors';
import { findMypageById } from 'containers/MyPage/actions';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/MyPage/reducer';
import saga from 'containers/MyPage/saga';
import Pagination from 'material-ui-flat-pagination';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    // paddingTop: theme.spacing(0),
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    // paddingBottom: 6,
    marginBottom: 14,
    // position: 'relative',
  },
  contentTop: {
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottom: 'solid 1px #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  boardTitle: {
    width: '100%',
    verticalAlign: 'middle',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  contentList: {
    backgroundColor: '#ffffff',
    borderBottom: 'solid 1px #dedede',
  },
  contentWrite: {
    backgroundColor: '#f8f8f8',
    // border: 'solid 1px #dedede',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 41,
    paddingBottom: 41,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 14,
      paddingRight: 14,
      paddingTop: 11,
      paddingBottom: 11,
    },
  },
  textArea: {
    width: '100%',
    resize: 'none',
    padding: 15,
  },
  buttonWrap: {
    textAlign: 'right',
  },
  buttonMore: {
    maxWidth: 200,
    width: '100%',
    padding: 0,
  },
  more: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
  },
  buttonPost: {
    width: '30%',
    marginRight: 10,
  },
  pagination: {
    textAlign: 'center',
  },
}));
function CommentList({
  boardId,
  boardMasterId,
  comments,
  handleComments,
  isSignin,
  findMypageByIdGet,
  userData,
}) {
  useInjectReducer({ key: 'myPage', reducer });
  useInjectSaga({ key: 'myPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [replyContent, setReplyContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [page, setPage] = React.useState(1);
  // const [commentList, setCommentList] = React.useState([]);

  useEffect(() => {
    if (comments) {
      if (comments.pageable) {
        // setCommentList(commentList.concat(comments.content));
        // setPage(comments.pageable.pageIndex);
      }
    }
  }, [comments]);

  const { board, pageable, content } = comments;

  // useEffect(() => {
  //   // console.log(comments);

  //   setCommentList(comments.content);
  // }, [comments]);
  const handleComment = (boardIdSend, pageSend) => {
    handleComments(boardIdSend, pageSend, 0);
    // setPage(page + 1);
  };
  const postComment = async () => {
    // console.log(content);
    if (!replyContent) {
      return false;
    }
    if (!loading) {
      setLoading(true);
      const options = {
        method: 'POST',
        data: {
          content: replyContent,
          boardId,
        },
        auth: true,
      };
      const result = await request(`/api/reply`, options);
      // console.log(result);
      if (result) {
        setReplyContent('');
        // setCommentList([]);
        handleComments(boardId, comments.pageable.pageIndex, 0);
        findMypageByIdGet();
      }
      setLoading(false);
    }
    return true;
  };

  // console.log(comments);
  if (!content) {
    return <LoadingIndicator />;
  }
  return (
    <div className={classes.root}>
      {matches && <div />}
      <div className={classes.contentTop}>
        <span className={classes.boardTitle}>
          <span>Comments</span>
        </span>
      </div>
      <div className={classes.contentList}>
        {content &&
          content.map(comment => (
            <CommentItem
              comment={comment}
              handleComment={handleComment}
              page={comments.pageable.pageIndex}
              userData={userData}
            />
          ))}

        {/* {!comments.last && (
          <div className={classes.more}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.buttonMore}
              onClick={handleComment}
            >
              더보기
            </Button>
          </div>
        )} */}
        <div className={classes.pagination}>
          {content.length > 0 && (
            <Pagination
              limit={pageable.pageSize}
              offset={(pageable.pageIndex - 1) * pageable.pageSize}
              total={pageable.totalCnt}
              onClick={(e, offset) =>
                handleComment(
                  board ? board.id : 0,
                  offset / pageable.pageSize + 1,
                )
              }
              className={classes.paging}
            />
          )}
        </div>
      </div>

      {isSignin && (
        <div className={classes.contentWrite}>
          <textarea
            rows="4"
            className={classes.textArea}
            placeholder="댓글 내용을 입력해주세요."
            maxLength="500"
            onChange={e => setReplyContent(e.target.value)}
            value={replyContent}
          />
          <div className={classes.buttonWrap}>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.button, classes.buttonPost)}
              onClick={postComment}
            >
              댓글등록
            </Button>
            <Link to={`/board/${boardMasterId}`} className={classes.link}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                목록
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  boardId: PropTypes.number.isRequired,
  boardMasterId: PropTypes.number.isRequired,
  comments: PropTypes.any.isRequired,
  userData: PropTypes.any.isRequired,
  handleComments: PropTypes.func.isRequired,
  findMypageByIdGet: PropTypes.func.isRequired,
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
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

// export default CommentList;
export default compose(withConnect)(CommentList);
