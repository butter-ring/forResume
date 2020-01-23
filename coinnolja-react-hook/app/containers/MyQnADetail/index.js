/**
 *
 * MyQnADetail
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import request from 'utils/request';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LevelIcon from 'components/LevelIcon';
import { format } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Modal from '@material-ui/core/Modal';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';
import MainCoinIndex from 'components/MainCoinIndex';
import { makeSelectMyPage } from 'containers/MyPage/selectors';
import { GetmyQnADetail } from './actions';
import makeSelectMyQnADetail from './selectors';
import reducer from './reducer';
import saga from './saga';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

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
    marginBottom: 14,
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
      fontSize: 16,
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
    paddingBottom: 10,
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
    paddingLeft: 25,
    paddingTop: 30,
    paddingBottom: 38,
    display: 'flex',
    justifyContent: 'center',
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
  },
  topBanner: {
    width: '100%',
  },
  editButtonWrap: {
    // display: 'flex',
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
  myPageTitle: {
    backgroundColor: '#ffffff',
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    height: 41,
  },
  myPageTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  topTitle: {
    display: 'flex',
    marginTop: 27,
    marginLeft: 21,
    paddingBottom: 18,
  },
  qna: {
    fontSize: 18,
    color: '#f6853c',
    fontWeight: 'bold',
    fontFamily: 'NotoSansCJKkr',
  },
  memberLevelWrap: {
    display: 'flex',
    // justifyContent: 'space-between',
  },
  memberNick: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  createdAt: {
    marginLeft: 30,
  },
  paper: {
    position: 'absolute',
    width: 230,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  answerTitle: {
    fontWeight: 'bold',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 15,
    paddingBottom: 10,
  },
  myPageTitleTextMobile: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  answerTitleMobile: {
    fontWeight: 'bold',
    fontFamily: 'NotoSansCJKkr',
    paddingBottom: 10,
  },
}));

export function MyQnADetail({ match, myQnADetailGet, myQnADetail, myPage }) {
  useInjectReducer({ key: 'myQnADetail', reducer });
  useInjectSaga({ key: 'myQnADetail', saga });

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  // const [openm, setOpenm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [writeAnswer, setWriteAnswer] = useState('');
  // const [modalStyle] = React.useState(getModalStyle);

  // console.log('check myQnA');
  // console.log(myQnA.myQnA);
  // console.log(match.params);
  // console.log(match.params.qnaId);

  // console.log('myPageCHekc');
  // console.log(myPage.myPage.admin);

  const { qnaId } = match.params;

  // console.log('index.js myQnA detail Check');
  // console.log(myQnADetail.myQnADetail);
  const {
    title,
    content,
    member,
    level,
    createdAt,
    hasAnswer,
    answer,
    id,
  } = myQnADetail.myQnADetail;

  useEffect(() => {
    if (qnaId) {
      console.log('useEffect qnaId');
      console.log(qnaId);
      myQnADetailGet(qnaId);
    }
  }, [match.params.qnaId]);

  function handleClose() {
    setOpen(false);
    setWriteAnswer('');
    setOpen(false);
  }

  const handleWriteAnswer = e => {
    setWriteAnswer(e.target.value);
  };

  // const handleOpenModal = () => {
  //   setOpenm(true);
  // };

  const handleOpen = () => {
    setOpen(true);
  };

  // function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();
  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `translate(-${top}%, -${left}%)`,
  //   };
  // }

  const clickHandler = async () => {
    setLoading(true);

    // useEffect(() => {
    //   setReceiverUsername(member);
    // }, [opennote, member]);

    const options = {
      method: 'POST',
      auth: true,
      data: {
        // senderId,
        answer: writeAnswer,
        id,
      },
    };

    try {
      const response = await request(`/api/myqna/answer`, options);
      // console.log('myQnaSave 확인');
      // console.log(response);
      // setLabel('받는 사람');
      // setLabelcon('쪽지 내용');
      if (response) {
        alert('작성 성공');
        myQnADetailGet(qnaId);
        handleClose();
      }
    } catch (err) {
      console.log(err.response);
      alert('작성 실패');
    }
    setLoading(false);
  };

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
        <div className={classes.topTitle}>
          {!matches && <MenuIcon className={classes.menuIcon} />}
          {!matches && (
            <div className={classes.myPageTitle}>
              <Typography className={classes.myPageTitleText}>
                나의 문의
              </Typography>
            </div>
          )}
          {matches && (
            <div className={classes.myPageTitleMobile}>
              <Typography className={classes.myPageTitleTextMobile}>
                나의 문의
              </Typography>
            </div>
          )}
        </div>
        <div>
          <Divider />
        </div>
        <div className={classes.contentTitle}>
          <div className={classes.titleInfo}>
            <div className={classes.titleWrap}>
              <div className={classes.title}>
                <span className={classes.qna}>[QnA]</span>
                <span>{title}</span>
              </div>
              <div>
                <div>
                  <div className={classes.memberLevelWrap}>
                    <LevelIcon level={level && level.memberLevel} />
                    <span className={classes.memberNick}>
                      {member && member.nickName}
                    </span>
                    <span className={classes.createdAt}>
                      {createdAt &&
                        format(
                          new Date(Number(createdAt)),
                          'yyyy-MM-dd HH:mm:ss',
                        )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className={classes.editButtonWrap}>
            {myPage.myPage.admin === true ? (
              <Button
                variant="outlined"
                color="primary"
                className={classes.writeButton}
                onClick={handleOpen}
              >
                답변하기
              </Button>
            ) : (
              <div />
            )}
            <div className={classes.dialog}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth="md"
              >
                <DialogTitle id="form-dialog-title">답변하기</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    multiline
                    type="text"
                    placeholder="답변 내용"
                    id="writeAnswer"
                    name="writeAnswer"
                    value={writeAnswer}
                    onChange={handleWriteAnswer}
                    rows="10"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="primary"
                  >
                    닫기
                  </Button>
                  <Button
                    onClick={clickHandler}
                    variant="outlined"
                    color="primary"
                  >
                    등록하기
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </span>
        </div>
        <div className={classes.contentTable}>{content}</div>
        <div className={classes.contentTable}>
          <div className={classes.answerTitleMobile}>답변내용</div>
          {hasAnswer !== 0 ? (
            <div>{answer}</div>
          ) : (
            <div>답변이 아직 등록되지 않았습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

MyQnADetail.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  myQnADetail: PropTypes.any,
  myQnADetailGet: PropTypes.func,
  myPage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  myQnADetail: makeSelectMyQnADetail(),
  myPage: makeSelectMyPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    myQnADetailGet: qnaId => {
      dispatch(GetmyQnADetail(qnaId));
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
)(MyQnADetail);
