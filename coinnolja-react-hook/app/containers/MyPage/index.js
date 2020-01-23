/**
 *
 * MyPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import request from 'utils/request';
import { connect } from 'react-redux';
// import { makeStyles, useTheme, withStyles, lighten } from '@material-ui/styles';
import {
  useTheme,
  lighten,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import dateFns from 'date-fns';
import { format } from 'date-fns';
import TopBanner from 'components/TopBanner';
import NoticeLine from 'components/NoticeLine';
import MyPageBoardList from 'components/MyPageBoardList';
import MyPageReplyList from 'components/MyPageReplyList';
import Note from 'components/Note';
import NoteList from 'components/NoteList';
import FollowList from 'components/FollowList';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Lv from 'images/lv.svg';
import Point from 'images/point.svg';
import List from '@material-ui/core/List';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
// import { signout } from 'containers/App/actions';
import { compose } from 'redux';
import { makeSelectSignin } from 'containers/App/selectors';
import LinearProgress from '@material-ui/core/LinearProgress';
import LevelIcon from 'components/LevelIcon';
import LevelText from 'components/LevelText';
import Alink from 'components/Alink';

import {
  findMypageById,
  myBoardList,
  myReplyList,
  noteList,
  followList,
  findProfileImage,
} from './actions';
import {
  makeSelectMyPage,
  makeSelectMyPageBoardList,
  makeSelectMyPageReplyList,
  makeSelectNoteList,
  makeSelectFollowList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    // flexGrow: 1,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  myPageWrapper: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    // width: 884,
  },
  content: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  myPageTopWrapper: {
    display: 'flex',
  },
  menuIcon: {
    marginLeft: 20,
    marginTop: 28,
  },
  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    maxWidth: 685,
    width: '100%',
    height: 41,
    marginLeft: 14,
    marginTop: 22,
  },
  myPageTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  line1: {
    height: 1,
    backgroundColor: '#dedede',
    marginTop: 17,
  },
  line2: {
    height: 1,
    marginLeft: '21%',
    backgroundColor: '#dedede',
  },
  bigAvatarDiv: {
    marginLeft: '4%',
    height: 180,
    display: 'flex',
    paddingTop: 35,
  },
  bigAvatar: {
    width: 100,
    height: 100,
    marginLeft: 54,
    // backgroundColor: '#dedede',
    // marginRight: 27,
  },
  avatarUpdateDiv: {
    width: 184,
  },
  imageUpdate: {
    fontFamily: 'NotoSansCJKkr',
    width: 100,
    height: 19,
    marginLeft: 54,
    marginTop: 4,
    marginBottom: 12,
  },
  imageUpdateText: {
    fontSize: 13,
    color: '#4d4d4d',
    textAlign: 'center',
  },
  nicknameWrapper: {
    width: 196,
    marginRight: 8,
    // marginLeft: '5%',
  },
  nickname: {
    fontFamily: 'NotoSansCJKkr',
    maxWidth: 196,
    width: '100%',
  },
  nicknameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lastSignUpWrapper: {
    width: '100%',
    maxWidth: 196,
  },
  lastSignUp: {
    fontFamily: 'NotoSansCJKkr',
    marginTop: 14,
  },
  lastSignUpText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lastSignUpDate: {
    fontFamily: 'NotoSansCJKkr',
    marginTop: 4,
  },
  lastSignUpDateText: {
    fontSize: 14,
  },
  signInWrapper: {
    width: '100%',
    maxWidth: 196,
  },
  firstsignIn: {
    maxWidth: 196,
    width: '100%',
    fontFamily: 'NotoSansCJKkr',
    marginTop: 50,
  },
  firstsignInText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  firstsignInDate: {
    maxWidth: 196,
    width: '100%',
    fontFamily: 'NotoSansCJKkr',
    marginTop: 4,
  },
  firstsignInDateText: {
    fontSize: 14,
  },
  buttonWrapper: {
    paddingLeft: 43,
    display: 'flex',
  },
  messegeBoxButton: {
    width: 88,
    height: 30,
    borderRadius: 3,
    border: 'solid 1px #979797',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    textAlign: 'center',
    color: '#4d4d4d',
    marginRight: 12,
  },
  profileUpdateButton: {
    width: 120,
    height: 30,
    border: 'solid 1px #979797',
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    textAlign: 'center',
    color: '#4d4d4d',
  },
  lvPointWrapper: {
    widht: '100%',
    paddingTop: 45,
    display: 'flex',
    marginLeft: '21%',
    height: 149,
  },
  levelWrapper: {
    width: 230,
    height: 70,
  },
  lvImg: {
    width: 58,
    height: 58,
  },
  level: {
    marginLeft: 16,
    fontFamily: 'NotoSansCJKkr',
    display: 'flex',
  },
  levelText: {
    fontSize: 14,
    color: '#4d4d4d',
  },
  levelDetail: {
    maxWidth: 196,
    width: '100%',
    fontFamily: 'NotoSansCJKkr',
    marginLeft: 17,
  },

  levelDetailText: {
    fontSize: 24,
    fontStyle: 'normal',
    fontStretch: 'normal',
    fontWeight: 'bold',
  },

  pointWrapper: {
    width: 433,
    display: 'flex',
    paddingLeft: 81,
  },
  pointImg: {
    width: 50,
    height: 50,
    objectFit: 'contain',
  },
  point: {
    marginLeft: 16,
    fontFamily: 'NotoSansCJKkr',
  },
  pointText: {
    fontSize: 14,
    color: '#4d4d4d',
  },
  pointDetail: {
    fontFamily: 'NotoSansCJKkr',
    marginLeft: 16,
  },
  pointDetailText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recentMyBoardListWrapper: {
    display: 'flex',
  },
  recentMyBoardListTitle: {
    width: '100%',
    maxWidth: 216,
    fontFamily: 'NotoSansCJKkr',
    paddingLeft: 20,
    paddingTop: 51,
  },
  recentMyBoardListTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  moreButtonWrapper: {
    paddingTop: 63,
    position: 'absolute',
    right: 21,
  },
  moreButton: {
    width: '100%',
    maxWidth: 86,
    height: '100%',
    maxHeight: 20,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 14,
    color: '#a6a6a6',
    textAlign: 'right',
  },
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  fileInput: {
    display: 'none',
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
  },
  margin: {
    marginTop: 5,
  },
  levelIcon: {
    paddingRight: 3,
    width: 22,
    height: 22,
  },
  levelNum: {
    color: '#4d85f1',
  },
  levelNumNext: {
    color: 'green',
  },
}));

// Mobile Styles-------------------------------------------------------------------------------------------------------
const stylesm = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    flexGrow: 1,
    marginTop: theme.spacing(0),
    overflowX: 'auto',
  },
  myPageWrapper: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
  },
  content: {
    backgroundColor: '#ffffff',
  },
  grow: {
    flexGrow: 1,
  },
  myPageTopWrapper: {
    display: 'flex',
  },
  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    verticalAlign: 'middle',
  },
  myPageTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  line1: {
    height: 1,
    backgroundColor: '#dedede',
    marginBottom: 21,
  },
  bigAvatarDiv: {
    display: 'flex',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
  },
  bigAvatar: {
    width: 46,
    height: 46,
  },
  imageUpdate: {
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    maxWidth: 100,
    maxHeight: 20,
    height: '100%',
    paddingLeft: 16,
    textAlign: 'left',
    verticalAlign: 'middle',
    marginTop: 27,
  },
  imageUpdateText: {
    fontSize: 12,
    color: '#a6a6a6',
  },
  nicknameWrapper: {
    width: 196,
    paddingLeft: 10,
    fontFamily: 'NotoSansCJKkr',
  },
  nicknameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  levelText: {
    display: 'flex',
    fontWeight: 'bold',
  },
  experienceNum: {
    color: '#4d85f1',
    fontWeight: 'bold',
  },
  divider1: {
    marginLeft: 16,
    marginRight: 16,
  },
  lvPointWrapper: {
    paddingLeft: 20,
    paddingRight: 18,
    paddingTop: 19,
    paddingBottom: 20,
  },
  levelWrapper: {
    display: 'flex',
    marginBottom: 5,
  },
  lvImg: {
    width: 24,
    height: 24,
  },
  level: {
    width: 86,
    height: 18,
    fontFamily: 'NotoSansCJKkr',
    paddingLeft: 8,
    paddingTop: 3,
    marginRight: 40,
  },
  levelText2: {
    width: 86,
    fontSize: 12,
    color: '#4d4d4d',
  },
  levelDetail2: {
    width: 164,
    fontFamily: 'NotoSansCJKkr',
  },
  levelDetail2Text: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4d85f1',
  },
  levelDetail2TextNext: {
    color: 'green',
  },
  pointWrapper: {
    display: 'flex',
  },
  pointImg: {
    width: 24,
    height: 24,
  },
  point: {
    height: 18,
    fontFamily: 'NotoSansCJKkr',
    marginLeft: 8,
    marginTop: 3,
    marginRight: 40,
  },
  pointText2: {
    fontSize: 12,
    color: '#4d4d4d',
  },
  pointDetail2: {
    width: 164,
    fontFamily: 'NotoSansCJKkr',
    textAlign: 'right',
    // paddingBottom: 19,
  },
  pointDetail2Text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    fontFamily: 'NotoSansCJKkr',
    alignContent: 'center',
    paddingLeft: 20,
    paddingRight: 16,
    paddingTop: 20,
    display: 'flex',
  },
  sendMessageButton: {
    width: 153,
    height: 30,
    fontSize: 12,
    textAlign: 'center',
    marginRight: 16,
  },
  receivedMessageButton: {
    width: 153,
    height: 30,
    fontSize: 12,
    borderRadius: 3,
  },
  profileUpdateButton: {
    width: 153,
    height: 30,
    fontSize: 12,
    textAlign: 'center',
    marginRight: 16,
  },
  dateWrapper: {
    marginTop: 16,
    marginBottom: 30,
    height: 68,
    backgroundColor: '#f2f2f2',
    display: 'flex',
  },
  lastSignUp: {
    marginTop: 15,
    marginLeft: 20,
    textAlign: 'center',
    width: 154,
    fontFamily: 'NotoSansCJKkr',
  },
  lastSignUpText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  lastSignUpDate: {
    fontSize: 12,
  },
  signIn: {
    marginLeft: 16,
    marginTop: 15,
    textAlign: 'center',
    width: 154,
    fontFamily: 'NotoSansCJKkr',
  },
  signInText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  signInDate: {
    fontSize: 12,
  },
  recentMyBoardList: {
    fontFamily: 'NotoSansCJKkr',
  },
  recentMyBoardListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingTop: 16,
  },
  divider2: {
    paddingBottom: 30,
  },
  editorWrap: {
    border: 'solid 1px #ddd',
    paddingLeft: 10,
    paddingRight: 10,
  },
  barWrap: {
    marginBottom: 10,
  },
}));

// MyPage function start ------------------------------------------------------------------------------
export function MyPage({
  myPage,
  findMypageByIdGet,
  myBoardListGet,
  myReplyListGet,
  noteListGet,
  followListGet,
  findProfileImageGet,
  isSignin,
  history,
}) {
  useInjectReducer({ key: 'myPage', reducer });
  useInjectSaga({ key: 'myPage', saga });
  const classes = styles();
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [inputKey, setInputKey] = useState('');
  // const [page, setPage] = useState(false);
  const [pageIndex] = useState(false);
  const [pageIndexflw] = useState(false);
  const [open, setOpen] = useState(false);

  // console.log(':::::::myPagemyPagemyPage::::::::');
  // console.log(myPage);

  // 쪽지창 열기
  function handleClickOpenNote() {
    setOpen(true);
  }

  // 쪽지창 닫기
  const handleCloseNote = () => {
    setOpen(false);
  };

  const handleAppend = async event => {
    const imageFile = event.target.files;
    if (imageFile) {
      if (imageFile.length > 0) {
        try {
          const data = new FormData();
          data.append('media', imageFile[0]);
          const options = {
            method: 'POST',
            data,
            auth: true,
            multipart: true,
          };
          const result = await request(`/api/profileimageupdate`, options);
          if (result) {
            if (result.data) {
              findProfileImageGet();
            }
          }
          setInputKey(Math.random().toString(36));
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const {
    createdAt,
    lastSigninAt,
    memberExperience,
    // memberLevel,
    memberPoint,
    nickName,
    level,
  } = myPage.myPage;

  const { profileImageUrl } = myPage;

  // 로그인 상태가 true가 아닐 경우 메인페이지로 보낸다.
  if (isSignin !== true) {
    history.push('/');
  }
  // console.log(level);
  const mypageStartRef = React.useRef(null);
  useEffect(() => {
    if (matches) {
      mypageStartRef.current.scrollIntoView(true);
    }
  });

  useEffect(() => {
    findProfileImageGet();
    findMypageByIdGet();
    myBoardListGet();
    myReplyListGet();

    if (!pageIndex) {
      pageload(1);
    }
    if (!pageIndexflw) {
      pageloadflw(1);
    }
  }, [pageIndex, pageIndexflw]);

  const pageload = pagenum => {
    noteListGet(pagenum);
    return true;
  };

  const pageloadflw = pagenum => {
    followListGet(pagenum);
    return true;
  };

  if (matches) {
    return (
      <div
        className={classesm.myPageWrapper}
        ref={mypageStartRef}
        id="mypageStartRef"
      >
        <div className={classesm.content}>
          <div className={classesm.myPageTopWrapper}>
            <div className={classesm.myPageTitle}>
              <Typography className={classesm.myPageTitleText}>
                마이페이지
              </Typography>
            </div>
          </div>
          <div className={classesm.line1} />
          <div className={classesm.bigAvatarDiv}>
            <div>
              {!profileImageUrl ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 22 22"
                  className={classesm.bigAvatar}
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
                  alt="profileImage"
                  src={profileImageUrl}
                  className={classesm.bigAvatar}
                />
              )}
            </div>
            <div className={classesm.nicknameWrapper}>
              <Typography className={classesm.nicknameText}>
                {nickName}
              </Typography>
              <Alink to="/exphistory" className={classes.link}>
                <Typography className={classesm.levelText}>
                  {/* Lv.{memberLevel}
                <Typography className={classesm.experienceText}>
                  &nbsp;(
                  <span className={classesm.experienceNum}>
                    {memberExperience}
                  </span>
                  /100)
                </Typography> */}
                  계급&nbsp;:&nbsp;
                  <LevelText level={level && level.memberLevel} />
                </Typography>
              </Alink>
            </div>
            <input
              accept="image/*"
              // allowmultiple="false"
              className={classes.fileInput}
              maxfiles={1}
              id="contained-button-imgfile"
              type="file"
              onChange={handleAppend}
              key={inputKey || ''}
            />
            <label htmlFor="contained-button-imgfile">
              <Button className={classesm.imageUpdate} component="span">
                <Typography className={classesm.imageUpdateText}>
                  사진수정 &#62;
                </Typography>
              </Button>
            </label>
          </div>
          <Divider className={classesm.divider1} />
          <div className={classesm.lvPointWrapper}>
            <div className={classesm.levelWrapper}>
              <div className={classesm.lvImg}>
                {/* <img src={Lv} alt="Lv" className={classesm.lvImg} /> */}
                <LevelIcon level={level && level.memberLevel} />
              </div>
              <div className={classesm.level}>
                <Typography className={classesm.levelText2}>
                  <LevelText level={level && level.memberLevel} />
                </Typography>
              </div>
              <div className={classesm.levelDetail2}>
                <Typography className={classesm.levelDetail2Text}>
                  {/* Lv.{memberLevel} ( */}
                  {memberExperience}/
                  <span className={classesm.levelDetail2TextNext}>
                    {level && level.nextExperience}
                  </span>
                  {/* ) */}
                </Typography>
              </div>
            </div>
            <div className={classesm.barWrap}>
              {level && (
                <BorderLinearProgress
                  className={classes.margin}
                  variant="determinate"
                  color="secondary"
                  value={level.experienceRate}
                />
              )}
            </div>
            <div className={classesm.pointWrapper}>
              <div className={classesm.pointImg}>
                <img src={Point} alt="Point" className={classesm.pointImg} />
              </div>
              <div className={classesm.point}>
                <Typography className={classesm.pointText2}>
                  코인놀자 포인트
                </Typography>
              </div>
              <div className={classesm.pointDetail2}>
                <Typography className={classesm.pointDetail2Text}>
                  {memberPoint}P
                </Typography>
              </div>
            </div>
          </div>

          <Divider className={classesm.divider1} />
          <div className={classesm.buttonWrapper}>
            <Button
              variant="outlined"
              className={classesm.sendMessageButton}
              onClick={handleClickOpenNote}
            >
              쪽지쓰기
            </Button>
            <Link to="/updateinfo" className={classes.link}>
              <Button
                variant="outlined"
                className={classesm.profileUpdateButton}
              >
                회원정보수정
              </Button>
            </Link>
            <Note opennote={open} closenote={handleCloseNote} />
          </div>

          <div className={classesm.dateWrapper}>
            <div className={classesm.lastSignUp}>
              <Typography className={classesm.lastSignUpText}>
                최종접속일시
              </Typography>
              <Typography className={classesm.lastSignUpDate}>
                {lastSigninAt &&
                  format(new Date(Number(lastSigninAt)), 'yyyy-MM-dd HH:mm:ss')}
              </Typography>
            </div>
            <div className={classesm.signIn}>
              <Typography className={classesm.signInText}>
                회원가입일시
              </Typography>
              <Typography className={classesm.signInDate}>
                {createdAt &&
                  format(new Date(Number(createdAt)), 'yyyy-MM-dd HH:mm:ss')}
              </Typography>
            </div>
          </div>
          <div className={classesm.recentMyBoardList}>
            <Typography className={classesm.recentMyBoardListTitle}>
              최근 작성한 글
            </Typography>
            <MyPageBoardList myBoard={myPage.myBoard && myPage.myBoard} />
          </div>
          <div className={classesm.recentMyBoardList}>
            <Typography className={classesm.recentMyBoardListTitle}>
              최근 작성한 댓글
            </Typography>
            <MyPageReplyList myReply={myPage.myReply && myPage.myReply} />
          </div>
          <div className={classesm.recentMyBoardList}>
            <Typography className={classesm.recentMyBoardListTitle}>
              쪽지 함
            </Typography>
            <NoteList
              pageload={pageload}
              notelist={myPage.notelist && myPage.notelist}
            />
          </div>
          <div className={classesm.recentMyBoardList}>
            <Typography className={classesm.recentMyBoardListTitle}>
              친구 목록
            </Typography>
            <FollowList
              pageload={pageloadflw}
              followlist={myPage.followlist && myPage.followlist}
            />
          </div>
          <Divider className={classesm.divider2} />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <List>
          <div className={classes.topBanner}>
            <TopBanner />
          </div>
          <div className={classes.notice}>
            <NoticeLine />
          </div>
          <div className={classes.myPageWrapper}>
            <div className={classes.content}>
              <div className={classes.myPageTopWrapper}>
                <MenuIcon className={classes.menuIcon} />
                <div className={classes.myPageTitle}>
                  <Typography className={classes.myPageTitleText}>
                    마이페이지
                  </Typography>
                </div>
              </div>
              <div className={classes.line1} />
              <div className={classes.bigAvatarDiv}>
                <div className={classes.avatarUpdateDiv}>
                  {!profileImageUrl ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      viewBox="0 0 22 22"
                      className={classes.bigAvatar}
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
                      alt="profileImage"
                      src={profileImageUrl}
                      className={classes.bigAvatar}
                    />
                  )}
                  <input
                    accept="image/*"
                    // allowmultiple="false"
                    className={classes.fileInput}
                    maxfiles={1}
                    id="contained-button-imgfile"
                    type="file"
                    onChange={handleAppend}
                    key={inputKey || ''}
                  />
                  <label htmlFor="contained-button-imgfile">
                    <Button className={classes.imageUpdate} component="span">
                      <Typography className={classes.imageUpdateText}>
                        사진수정 &#62;
                      </Typography>
                    </Button>
                  </label>
                </div>
                <div className={classes.nicknameWrapper}>
                  <div className={classes.nickname}>
                    <Typography className={classes.nicknameText}>
                      {nickName}
                    </Typography>
                  </div>
                  <div className={classes.lastSignUpWrapper}>
                    <div className={classes.lastSignUp}>
                      <Typography className={classes.lastSignUpText}>
                        최종접속일시
                      </Typography>
                    </div>
                    <div className={classes.lastSignUpDate}>
                      <Typography className={classes.lastSignUpDateText}>
                        {lastSigninAt &&
                          format(
                            new Date(Number(lastSigninAt)),
                            'yyyy-MM-dd HH:mm:ss',
                          )}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.signInWrapper}>
                  <div className={classes.firstsignIn}>
                    <Typography className={classes.firstsignInText}>
                      회원가입일시
                    </Typography>
                  </div>
                  <div className={classes.firstsignInDate}>
                    <Typography className={classes.firstsignInDateText}>
                      {createdAt &&
                        format(
                          new Date(Number(createdAt)),
                          'yyyy-MM-dd HH:mm:ss',
                        )}
                    </Typography>
                  </div>
                </div>
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="outlined"
                    className={classes.messegeBoxButton}
                    onClick={handleClickOpenNote}
                  >
                    쪽지쓰기
                  </Button>
                  <Link to="/updateinfo" className={classes.link}>
                    <Button
                      variant="outlined"
                      className={classes.profileUpdateButton}
                    >
                      회원정보수정
                    </Button>
                  </Link>
                  <Note opennote={open} closenote={handleCloseNote} />
                </div>
              </div>
              <div className={classes.line2} />
              <div className={classes.lvPointWrapper}>
                <div className={classes.lvImg}>
                  <img src={Lv} alt="Lv" className={classes.lvImg} />
                </div>
                <div className={classes.levelWrapper}>
                  <div className={classes.level}>
                    {level && (
                      <div className={classes.levelIcon}>
                        <LevelIcon level={level.memberLevel} />
                      </div>
                    )}

                    <Typography className={classes.levelText}>
                      <LevelText level={level && level.memberLevel} />
                    </Typography>
                  </div>
                  <div className={classes.levelDetail}>
                    <Typography className={classes.levelDetailText}>
                      <span className={classes.levelNum}>
                        {memberExperience}
                      </span>
                      /
                      <span className={classes.levelNumNext}>
                        {level ? level.nextExperience : `0`}
                      </span>
                    </Typography>
                  </div>
                </div>
                <div className={classes.pointWrapper}>
                  <div className={classes.pointImg}>
                    <img src={Point} alt="Point" className={classes.pointImg} />
                  </div>
                  <div>
                    <div className={classes.point}>
                      <Typography className={classes.pointText}>
                        코인놀자 포인트
                      </Typography>
                    </div>
                    <div className={classes.pointDetail}>
                      <Typography className={classes.pointDetailText}>
                        {memberPoint}P
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.line2} />
              <div className={classes.recentMyBoardListWrapper}>
                <div className={classes.recentMyBoardListTitle}>
                  <Typography className={classes.recentMyBoardListTitleText}>
                    최근 작성한 글
                  </Typography>
                </div>
              </div>
              <div className={classes.recentMyBoardList}>
                <MyPageBoardList myBoard={myPage.myBoard && myPage.myBoard} />
              </div>

              <div className={classes.recentMyBoardListWrapper}>
                <div className={classes.recentMyBoardListTitle}>
                  <Typography className={classes.recentMyBoardListTitleText}>
                    최근 작성한 댓글
                  </Typography>
                </div>
              </div>
              <div className={classes.recentMyBoardList}>
                <MyPageReplyList myReply={myPage.myReply && myPage.myReply} />
              </div>

              <div className={classes.recentMyBoardListWrapper}>
                <div className={classes.recentMyBoardListTitle}>
                  <Typography className={classes.recentMyBoardListTitleText}>
                    쪽지 함
                  </Typography>
                </div>
              </div>
              <div className={classes.recentMyBoardList}>
                <NoteList
                  pageload={pageload}
                  notelist={myPage.notelist && myPage.notelist}
                />
              </div>
              <div className={classes.recentMyBoardListWrapper}>
                <div className={classes.recentMyBoardListTitle}>
                  <Typography className={classes.recentMyBoardListTitleText}>
                    친구 목록
                  </Typography>
                </div>
              </div>
              <div className={classes.recentMyBoardList}>
                <FollowList
                  pageload={pageloadflw}
                  followlist={myPage.followlist && myPage.followlist}
                />
              </div>
            </div>
          </div>
        </List>
      </div>
    </React.Fragment>
  );
}
// MyPage function End -----------------------------------------------

MyPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  findMypageByIdGet: PropTypes.func,
  findProfileImageGet: PropTypes.func,
  myPage: PropTypes.any,
  myBoardListGet: PropTypes.func,
  myReplyListGet: PropTypes.func,
  noteListGet: PropTypes.any,
  followListGet: PropTypes.any,
  isSignin: PropTypes.any,
  history: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myPage: makeSelectMyPage(),
  myBoard: makeSelectMyPageBoardList(),
  myReply: makeSelectMyPageReplyList(),
  noteList: makeSelectNoteList(),
  followList: makeSelectFollowList(),
  isSignin: makeSelectSignin(),
  // profileImageUrl: makeSelectMyProfileImage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMypageByIdGet: () => {
      dispatch(findMypageById());
    },
    myBoardListGet: () => {
      dispatch(myBoardList());
    },
    myReplyListGet: () => {
      dispatch(myReplyList());
    },
    noteListGet: page => {
      dispatch(noteList(page));
    },
    followListGet: page => {
      dispatch(followList(page));
    },
    findProfileImageGet: () => {
      dispatch(findProfileImage());
    },
    // signoutAction: () => {
    //   dispatch(signout());
    // },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyPage);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#ff6c5c', 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);
