import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/styles';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import reducer from 'containers/MyPage/reducer';
import saga from 'containers/MyPage/saga';
import { findMypageById, findProfileImage } from 'containers/MyPage/actions';
import { signout } from 'containers/App/actions';
import {
  makeSelectMyPage,
  makeSelectMyProfileImage,
} from 'containers/MyPage/selectors';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';
import LevelIcon from 'components/LevelIcon';
import LevelText from 'components/LevelText';
import Alink from 'components/Alink';

// import LevelText from 'components/LevelText';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    border: 'solid 1px #dedede',
    backgroundColor: '#ffffff',
    paddinTop: theme.spacing(0),
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailsWide: {
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
    fontFamily: 'NotoSansCJKkr',
  },
  username: {
    display: 'flex',
    paddingTop: 18,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottom: '1px solid #e0e0e0',
  },
  avatar: {
    maxWidth: 46,
    maxHeight: 46,
    // width: '100%',
    // height: '100%',
    marginRight: 10,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 1.4,
    letterSpacing: 0,
    color: '#313131',
    // height: 26,
  },
  levelText: {
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
    // height: 20,
  },
  levelNum: {
    color: '#4d85f1',
  },
  level: {
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 16,
    // paddingBottom: 16,
    display: 'flex',
    justifyContent: 'space-between',
  },
  svg: {
    marginRight: 5,
  },
  pointText: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    color: '#313131',
  },
  pointNum: {
    fontSize: 16,
    color: '#4d85f1',
    fontWeight: 'bold',
  },
  pointUnit: {
    color: '#4d4d4d',
    fontWeight: 'normal',
  },
  button: {
    width: '100%',
    fontWeight: 800,
  },
  buttonWrap: {
    padding: 10,
  },
  link: {
    textDecoration: 'none',
  },
  margin: {
    marginTop: 5,
  },
  levelWrapper: {
    display: 'flex',
  },
  levelIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  buttonMyinfo: {},
  usernameWarp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  levelTextWrap: {
    paddingTop: 5,
  },
  progress: {
    marginTop: 5,
    width: 150,
  },
  levelBar: {
    display: 'flex',
  },
  expNum: {
    fontSize: 13,
    color: 'green',
  },
  usernameWarpImg: {
    display: 'flex',
  },
  linkWrap: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    // textAlign: 'center',
    color: '#3b69c1',
    marginTop: 20,
  },
}));

function MainMyInfo({
  myPage,
  findMypageByIdGet,
  signoutAction,
  findProfileImageGet,
}) {
  const classes = useStyles();
  useInjectReducer({ key: 'myPage', reducer });
  useInjectSaga({ key: 'myPage', saga });
  const [savePass, setSavePass] = useState(false);

  const {
    memberExperience,
    // memberLevel,
    memberPoint,
    nickName,
    level,
  } = myPage.myPage;

  const { profileImageUrl } = myPage;

  useEffect(() => {
    findMypageByIdGet();
    findProfileImageGet();
    if (localStorage.getItem('savePass') === 'true') {
      setSavePass(true);
    }
  }, []);

  const handleSignout = () => {
    if (!savePass) {
      localStorage.removeItem('usernameSave');
      localStorage.removeItem('passwordSave');
      localStorage.removeItem('savePass');
    }
    signoutAction();
  };
  const handleToggle = () => {
    setSavePass(!savePass);
  };
  return (
    <div className={classes.root}>
      <div className={classes.username}>
        {/* {!profileImageUrl ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 22 22"
            className={classes.avatar}
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
            src={profileImageUrl}
            className={classes.avatar}
          />
        )} */}
        <div className={classNames(classes.details, classes.detailsWide)}>
          <div className={classes.content}>
            <div className={classes.usernameWarp}>
              <div className={classes.usernameWarpImg}>
                {!profileImageUrl ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    viewBox="0 0 22 22"
                    className={classes.avatar}
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
                    src={profileImageUrl}
                    className={classes.avatar}
                  />
                )}
                <Link to="/mypage" className={classes.link}>
                  <Typography className={classes.usernameText}>
                    {nickName}
                  </Typography>
                </Link>
              </div>
              <Alink to="/updateinfo" className={classes.link}>
                <Button
                  className={classes.buttonMyinfo}
                  variant="outlined"
                  size="small"
                >
                  내정보수정
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                  </svg>
                </Button>
              </Alink>
            </div>
            <div className={classes.levelWrapper}>
              <div className={classes.levelIcon}>
                <Alink to="/exphistory" className={classes.link}>
                  <LevelIcon level={level && level.memberLevel} />
                </Alink>
              </div>

              <Typography className={classes.levelText}>
                (<span className={classes.levelNum}>{memberExperience}</span>/
                <span className={classes.expNum}>
                  {level ? level.nextExperience : `0`})
                </span>
              </Typography>
            </div>
          </div>

          <div className={classes.levelTextWrap}>
            <Alink to="/exphistory" className={classes.link}>
              계급&nbsp;:&nbsp;
              <LevelText level={level && level.memberLevel} />
            </Alink>
          </div>
          {level && (
            <div className={classes.levelBar}>
              경험치&nbsp;:&nbsp;
              <BorderLinearProgress
                className={classes.progress}
                variant="determinate"
                color="secondary"
                value={level.experienceRate}
              />
            </div>
          )}
        </div>
      </div>
      <div className={classes.level}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className={classes.svg}
          >
            <path
              fill="#4D85F1"
              fillRule="evenodd"
              d="M9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm-3-4h1.944v-3.554h1.3c2.088 0 3.756-1.027 3.756-3.31C13 4.77 11.345 4 9.191 4H6v10zm1.944-5.135V5.58h1.103c1.34 0 2.049.392 2.049 1.554 0 1.149-.644 1.73-1.983 1.73h-1.17z"
            />
          </svg>
          <span className={classes.pointText}>포인트</span>
        </div>
        <div className={classes.details}>
          <div className={classes.content}>
            <Typography className={classes.pointNum}>
              {memberPoint}
              <span className={classes.pointUnit}>P</span>
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.buttonWrap}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleSignout}
        >
          로그아웃
        </Button>
        <div className={classes.linkWrap}>
          <input
            type="checkbox"
            checked={savePass && true}
            onChange={e => setSavePass(e.target.checked)}
          />{' '}
          <span onClick={handleToggle} role="presentation">
            아이디/패스워드 저장하기
          </span>
        </div>
      </div>
    </div>
  );
}

MainMyInfo.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  findMypageByIdGet: PropTypes.func,
  findProfileImageGet: PropTypes.func,
  signoutAction: PropTypes.func,
  myPage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  myPage: makeSelectMyPage(),
  profileImageUrl: makeSelectMyProfileImage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findMypageByIdGet: () => {
      dispatch(findMypageById());
    },
    signoutAction: () => {
      dispatch(signout());
    },
    findProfileImageGet: () => {
      dispatch(findProfileImage());
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
)(MainMyInfo);

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
