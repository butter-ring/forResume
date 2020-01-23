/**
 *
 * BoardDetailPage
 *
 */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import LoadingIndicator from 'components/LoadingIndicator';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';
import NoticeLine from 'components/NoticeLine';
import CommentList from 'components/CommentList';
import TopBanner from 'components/TopBanner';
import ErrorPop from 'components/ErrorPop';
import MemberName from 'components/MemberName';
import JudgeButton from 'components/JudgeButton';
import { hasRole } from 'containers/BoardPage';
import { hasReadRole } from 'components/BoardList';
import request from 'utils/request';
import MainCoinIndex from 'components/MainCoinIndex';
import classNames from 'classnames';
import {
  makeSelectBoardDetailPage,
  makeSelectBoardDetail,
  makeSelectBoardDetailError,
  makeSelectBoardDetailLoading,
  makeSelectComments,
} from './selectors';
import { boradLoad, commentsLoad } from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
    // display: 'flex',
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingBottom: 6,
    marginBottom: 1,
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
    display: 'flex',
    lineHeight: 0,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      // flex: 1,
    },
  },
  titleWrap: {
    // display: 'flex',
  },
  title: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 600,
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      maxWidth: 280,
    },
  },
  contentTitle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 11,
    paddingBottom: 13,
    borderBottom: 'solid 1px #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
  menuIcon: {
    maxWidth: 30,
    maxHeight: 30,
    width: '100%',
    height: '100%',
    marginRight: 12,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#434343',
  },
  speechBubble: {
    minWidth: 69,
    height: 35,
    // width: '100%',
    position: 'relative',
    background: '#f8f8f8',
    borderRadius: '.2em',
    border: 'solid 1px #dedede',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: 7,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    '&:after': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      top: '100%',
      left: '90%',
      width: 0,
      height: 0,
      border: '10px solid transparent',
      borderTopColor: '#f8f8f8',
      borderBottom: 0,
      borderRight: 0,
      marginLeft: -12.5,
      marginBottom: -25,
      // borderWidth: 30,
    },
    '&:before': {
      content: `''`,
      position: 'absolute',
      bottom: 0,
      top: '100%',
      left: '90%',
      width: 0,
      height: 0,
      border: '12px solid transparent',
      borderTopColor: '#dedede',
      borderBottom: 0,
      borderRight: 0,
      marginLeft: -13.5,
      marginBottom: -26,
      // borderWidth: 32,
    },
  },
  svgAnyone: {
    marginRight: 8,
  },
  titleInfo: {
    display: 'flex',
  },
  boardType: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f6853c',
    marginRight: 15,
    minWidth: 42,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      marginRight: 5,
    },
  },
  writeButton: {
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  listButton: {
    marginRight: 0,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  contentTable: {
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottom: 'solid 1px #dedede',
  },
  contentVote: {
    paddingRight: 25,
    // paddingLeft: 70,
    paddingTop: 30,
    paddingBottom: 38,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  vote: {
    // display: 'flex',
    // justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      width: 86,
      height: 86,
    },
  },
  voteCount: {
    textAlign: 'center',
    color: '#3b69c1',
  },
  deVoteCount: {
    textAlign: 'center',
    color: '#f05c5c',
  },
  buttonWrap: {
    minWidth: 200,
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      minWidth: 140,
    },
  },
  topBanner: {
    width: '100%',
  },
  editButtonWrap: {
    display: 'flex',
  },
  isSigninRequired: {
    padding: 16,
    textAlign: 'center',
    border: 'solid 1px #dedede',
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  judge: {
    position: 'absolute',
    right: 0,
    paddingRight: 20,
    // padding: 25,
    // borderTop: 'solid 1px #dedede',
    [theme.breakpoints.down('xs')]: {
      borderTop: 'none',
      paddingTop: 10,
      paddingBottom: 5,
      paddingLeft: 0,
      paddingRight: 8,
      right: 0,
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
  nextinfo: {
    display: 'flex',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 4,
      paddingBottom: 4,
      fontSize: 12,
    },
  },
  nextButton: {
    display: 'flex',
    alignItems: 'center',
  },
  nextText: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 300,
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 240,
      fontSize: 12,
    },
  },
  aspan: {
    display: 'flex',
    alignItems: 'center',
  },
  aspanNext: {
    textAlign: 'right',
  },

  nextButtonNext: {
    textAlign: 'right',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      borderTop: 'solid 1px #dddddd',
      justifyContent: 'start',
    },
  },
  commentCount: {
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
  voteUp: {
    paddingRight: 10,
  },
}));

export function BoardDetailPage({
  match,
  boardDetail,
  boardLoad,
  isSignin,
  comments,
  commentsLoadAction,
  userData,
}) {
  // console.log('match check');
  // console.log(match);

  useInjectReducer({ key: 'boardDetailPage', reducer });
  useInjectSaga({ key: 'boardDetailPage', saga });
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(0);

  const [downVoteCount, setDownVoteCount] = useState(0);
  const [openError, setOpenError] = useState({
    open: false,
    errorCode: false,
  });
  const [judgeCount, setJudgeCount] = useState(0);

  const handleComments = (boardId, page, parentId) => {
    console.log(page);
    // setCommentPage(page);
    commentsLoadAction(boardId, page, parentId);
  };
  const { boardId } = match.params;
  useEffect(() => {
    // console.log(match.params.boardId);
    // const { boardId } = match.params;
    if (boardId) {
      boardLoad(boardId);
      commentsLoadAction(boardId, 1, 0);
    }
    // scrollToTop();
  }, [match.params.boardId, isSignin]);
  // useEffect(() => {
  //   scrollToTop();
  // })[match.params.boardId];

  useEffect(() => {
    if (boardDetail) {
      setUpVoteCount(boardDetail.upVoteCount);
      setDownVoteCount(boardDetail.downVoteCount);
      setJudgeCount(boardDetail.judgeCount);
    }
  }, [boardDetail, isSignin]);

  // useEffect(() => {}, [commentPage]);
  const handleVote = async voteTypeSend => {
    if (loading || !isSignin) {
      return false;
    }
    if (!hasRole(userData, boardMaster)) {
      setOpenError({
        open: true,
        errorCode: {
          code: 403001,
        },
      });
      return false;
    }

    try {
      setLoading(true);
      // const { boardId } = match.params;
      const options = {
        method: 'POST',
        data: {
          voteType: voteTypeSend,
          boardId,
        },
        auth: true,
      };
      const result = await request(`/api/vote`, options);
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

  const handleCloseError = () => {
    setOpenError({
      open: false,
      errorCode: false,
    });
  };

  if (!boardDetail) {
    return <LoadingIndicator />;
  }
  const {
    boardMaster,
    member,
    prevBoard,
    nextBoard,
    mediaCollections,
  } = boardDetail;
  // console.log(boardDetail);
  // console.log(prevBoard);
  // console.log(member);
  // console.log(member.id == userData.userId);
  // console.log(hasReadRole(userData, boardMaster));
  if (!hasReadRole(userData, boardMaster)) {
    return <div className={classes.isSigninRequired}>로그인이 필요합니다.</div>;
  }

  if (boardMaster.levelLimit) {
    if (boardMaster.levelLimit > userData.memberLevel) {
      return (
        <div className={classes.isSigninRequired}>접근 권한이 없습니다.</div>
      );
    }
    if (!userData.memberLevel) {
      return (
        <div className={classes.isSigninRequired}>접근 권한이 없습니다.</div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <MainCoinIndex />
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}
      <div className={classes.contentWrap}>
        <div className={classes.contentTop}>
          <span className={classes.boardTitle}>
            {!matches && <MenuIcon className={classes.menuIcon} />}
            <span>{boardMaster.boardName}</span>
          </span>
          <div className={classes.buttonWrap}>
            {isSignin && hasRole(userData, boardMaster) && (
              <Link
                to={`/board/post/${boardMaster.id}/${boardMaster.boardType}`}
                className={classes.link}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  글쓰기
                </Button>
              </Link>
            )}

            <Link to={`/board/${boardMaster.id}`} className={classes.link}>
              <Button
                variant="contained"
                color="primary"
                className={classes.listButton}
              >
                목록
              </Button>
            </Link>
          </div>
        </div>
        <div className={classes.contentTitle}>
          <div className={classes.titleInfo}>
            <div className={classes.boardType}>
              {boardMaster && boardMaster.boardSubName && (
                <span
                  style={{
                    color: `#${boardMaster.boardSubNameColor}`,
                    fontWeight: 'bold',
                  }}
                >
                  {`[${boardMaster.boardSubName}]`}&nbsp;
                </span>
              )}
            </div>
            <div className={classes.titleWrap}>
              <div className={classes.title}>{boardDetail.title}</div>
              <div>{member && <MemberName member={member} />}</div>
            </div>
          </div>

          <div className={classes.editButtonWrap}>
            {isSignin && userData.userId.toString() === member.id.toString() && (
              <Link
                to={`/board/put/${boardMaster.id}/${boardMaster.boardType}/${
                  boardDetail.id
                }`}
                className={classes.link}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  수정
                </Button>
              </Link>
            )}
            {!matches && (
              <div className={classes.bubble}>
                <hgroup className={classes.speechBubble}>
                  댓글 {boardDetail.commentCount}
                </hgroup>
              </div>
            )}
          </div>
        </div>
        {mediaCollections &&
          mediaCollections.length > 0 &&
          mediaCollections.map(image => (
            <div>
              <img src={image.fullPath} alt="" />
            </div>
          ))}
        <div
          className={classes.contentTable}
          dangerouslySetInnerHTML={{ __html: boardDetail.content }}
        />

        {isSignin && (
          <div className={classes.contentVote}>
            <div className={classNames(classes.vote, classes.voteUp)}>
              <IconButton onClick={() => handleVote('UP')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={matches ? 62 : 100}
                  height={matches ? 62 : 100}
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="#4D85F1"
                    fillRule="evenodd"
                    d="M70.575 51.683c0 1.346-1.15 2.755-3.517 2.938-1.45.112-1.804 1.3-.062 1.691 1.458.334 2.283 1.359 2.283 2.467 0 1.304-1.162 2.721-3.804 3.208-1.596.292-1.754 1.855-.062 1.988 1.429.108 1.991.608 1.991 1.3 0 1.942-3.442 5.554-10.108 5.554-10.421.004-14.196-6.246-28.13-6.246V43.9c7.359-1.13 14.517-3.404 18.1-15.842.997-3.462 1.626-7.225 4.95-7.225 4.947 0 5.405 10.675 3.513 18.296 2.738 1.434 7.813 1.95 10.375 1.842 3.688-.15 4.73 1.704 4.73 3.104 0 2.104-1.734 2.813-2.817 3.146-1.271.391-1.854 1.683-.067 1.92 1.742.234 2.625 1.367 2.625 2.542zM100 37.696c0-3.209-1.58-6.308-4.392-8.258-8.97-6.217-7.783-4.655-11.17-14.767-1.413-4.225-5.5-7.083-10.121-7.067-11.059.034-9.138.638-18.063-5.641A10.866 10.866 0 0 0 50 0c-2.192 0-4.396.654-6.258 1.963-8.975 6.312-7.03 5.675-18.063 5.641-4.608-.012-8.704 2.846-10.12 7.067-3.384 10.137-2.217 8.562-11.163 14.767C1.579 31.392 0 34.487 0 37.695c0 1.062.17 2.133.53 3.179 3.457 10.117 3.445 8.18 0 18.25a9.804 9.804 0 0 0-.53 3.18c0 3.208 1.58 6.307 4.4 8.258 8.946 6.204 7.783 4.641 11.162 14.766 1.417 4.225 5.509 7.083 10.121 7.067 11.059-.038 9.138-.633 18.063 5.641A10.876 10.876 0 0 0 50 100c2.196 0 4.396-.654 6.258-1.963 8.921-6.274 7.005-5.675 18.063-5.641 4.617.012 8.708-2.846 10.12-7.067 3.388-10.116 2.2-8.554 11.171-14.766 2.809-1.95 4.388-5.05 4.388-8.259 0-1.058-.17-2.133-.53-3.179-3.462-10.112-3.445-8.18 0-18.25a9.786 9.786 0 0 0 .53-3.18z"
                  />
                </svg>
              </IconButton>
              <div className={classes.voteCount}>{upVoteCount}</div>
            </div>
            <div className={classes.vote}>
              <IconButton onClick={() => handleVote('DOWN')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={matches ? 62 : 100}
                  height={matches ? 62 : 100}
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="#F05C5C"
                    fillRule="evenodd"
                    d="M32.05 50.858c-1.742-.233-2.625-1.366-2.625-2.541 0-1.346 1.15-2.755 3.517-2.938 1.45-.112 1.804-1.3.062-1.692-1.458-.333-2.283-1.358-2.283-2.466 0-1.304 1.162-2.721 3.804-3.209 1.596-.291 1.754-1.854.062-1.987-1.429-.108-1.991-.608-1.991-1.3 0-1.942 3.442-5.554 10.108-5.554 10.421-.004 14.196 6.246 28.13 6.246V56.1c-7.359 1.13-14.517 3.404-18.1 15.842-.997 3.462-1.626 7.225-4.95 7.225-4.947 0-5.405-10.675-3.513-18.296-2.738-1.434-7.813-1.95-10.375-1.842-3.688.15-4.73-1.704-4.73-3.104 0-2.104 1.734-2.813 2.817-3.146 1.271-.392 1.854-1.683.067-1.92M.53 59.124a9.786 9.786 0 0 0-.53 3.18c0 3.207 1.58 6.307 4.392 8.257 8.97 6.217 7.783 4.655 11.17 14.767 1.413 4.225 5.5 7.083 10.121 7.067 11.059-.034 9.138-.638 18.063 5.641A10.866 10.866 0 0 0 50 100c2.192 0 4.396-.654 6.258-1.963 8.975-6.312 7.03-5.675 18.063-5.641 4.608.012 8.704-2.846 10.12-7.067 3.384-10.137 2.217-8.562 11.163-14.767 2.817-1.954 4.396-5.05 4.396-8.258 0-1.062-.17-2.133-.53-3.179-3.457-10.117-3.445-8.18 0-18.25.36-1.046.53-2.12.53-3.18 0-3.208-1.58-6.308-4.4-8.258-8.946-6.204-7.783-4.641-11.162-14.766-1.417-4.225-5.509-7.084-10.121-7.067-11.059.038-9.138.633-18.063-5.642A10.876 10.876 0 0 0 50 0c-2.196 0-4.396.654-6.258 1.962-8.921 6.275-7.005 5.675-18.063 5.642-4.616-.012-8.708 2.846-10.12 7.067-3.388 10.116-2.2 8.554-11.171 14.766C1.579 31.387 0 34.487 0 37.696c0 1.058.17 2.133.53 3.179 3.462 10.112 3.445 8.18 0 18.25"
                  />
                </svg>
              </IconButton>
              <div className={classes.deVoteCount}>{downVoteCount}</div>
            </div>
            {isSignin && (
              <div className={classes.judge}>
                <JudgeButton
                  judgeCount={judgeCount}
                  judgeType="board"
                  judgeId={boardDetail.id}
                />
              </div>
            )}
          </div>
        )}
        {/* {isSignin && !matches && (
          <div className={classes.judge}>
            <JudgeButton
              judgeCount={judgeCount}
              judgeType="board"
              judgeId={boardDetail.id}
            />
          </div>
        )} */}
      </div>
      {matches ? (
        <div className={classes.nextinfo}>
          <div className={classes.nextButton}>
            {prevBoard && (
              <Link
                to={`/board/detail/${prevBoard.id}`}
                className={classNames(classes.link, classes.aspan)}
              >
                <Button
                  // variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 6l-4 4h8z" />
                  </svg>
                  이전글
                </Button>
                <span className={classes.nextText}>{prevBoard.title}</span>
                <span className={classes.commentCount}>
                  [{prevBoard.commentCount}]
                </span>
              </Link>
            )}
          </div>

          <div
            className={classNames(classes.nextButton, classes.nextButtonNext)}
          >
            {nextBoard && (
              <Link
                to={`/board/detail/${nextBoard.id}`}
                className={classNames(
                  classes.link,
                  classes.aspan,
                  classes.aspanNext,
                )}
              >
                <Button
                  // variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M5 8l4 4 4-4z" />
                  </svg>
                  다음글
                </Button>
                <span className={classes.nextText}>{nextBoard.title}</span>
                <span className={classes.commentCount}>
                  [{nextBoard.commentCount}]
                </span>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.nextinfo}>
          <div className={classes.nextButton}>
            {prevBoard && (
              <Link
                to={`/board/detail/${prevBoard.id}`}
                className={classNames(classes.link, classes.aspan)}
              >
                <Button
                  // variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" />
                  </svg>
                  이전글
                </Button>
                <span className={classes.nextText}>{prevBoard.title}</span>
              </Link>
            )}
          </div>

          <div
            className={classNames(classes.nextButton, classes.nextButtonNext)}
          >
            {nextBoard && (
              <Link
                to={`/board/detail/${nextBoard.id}`}
                className={classNames(
                  classes.link,
                  classes.aspan,
                  classes.aspanNext,
                )}
              >
                <span className={classes.nextText}>{nextBoard.title}</span>
                <Button
                  // variant="outlined"
                  color="primary"
                  className={classes.writeButton}
                >
                  다음글
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M9 3L7.94 4.06l4.19 4.19H3v1.5h9.13l-4.19 4.19L9 15l6-6z" />
                  </svg>
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
      {boardMaster.isSecret !== 1 && (
        <CommentList
          boardId={boardDetail.id}
          boardMasterId={boardMaster.id}
          comments={comments}
          handleComments={handleComments}
          userData={userData}
        />
      )}

      <ErrorPop
        handleClose={handleCloseError}
        openError={openError}
        errorTitle="게시글"
      />
    </div>
  );
}

BoardDetailPage.propTypes = {
  match: PropTypes.object.isRequired,
  boardDetail: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  boardLoad: PropTypes.func.isRequired,
  isSignin: PropTypes.any,
  comments: PropTypes.any,
  commentsLoadAction: PropTypes.func.isRequired,
  userData: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  boardDetailPage: makeSelectBoardDetailPage(),
  boardDetail: makeSelectBoardDetail(),
  loading: makeSelectBoardDetailLoading(),
  error: makeSelectBoardDetailError(),
  isSignin: makeSelectSignin(),
  comments: makeSelectComments(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    boardLoad: boardId => {
      dispatch(boradLoad(boardId));
    },
    commentsLoadAction: (boardId, page, parentId) => {
      dispatch(commentsLoad(boardId, page, parentId));
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
)(BoardDetailPage);
