import React, { memo, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import TopMenu from 'components/TopMenu';
import TopMenuMobile from 'components/TopMenuMobile';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import useReactRouter from 'use-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { signout } from 'containers/App/actions';

import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';

import reducer from 'containers/App/reducer';
import saga from 'containers/SideBar/saga';
import LevelIcon from 'components/LevelIcon';
import LevelText from 'components/LevelText';

// import TextField from '@material-ui/core/TextField';

// import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LogoImage from '../../images/logo-2@3x.png';
import SigninImage from '../../images/group-6-copy@3x.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  appbar: {
    width: '100%',
    height: 120,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  toolbar: {
    width: '100%',
    maxWidth: 1400,
    // maxWidth: 1400,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 'auto',
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    width: 123,
    height: 43,
    fontFamily: 'TmonMonsori',
    fontSize: 34,
    fontWeight: 900,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: -0.1,
    textAlign: 'center',
    color: '#ffffff',
    marginRight: 54,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 999,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    // paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      // '&:focus': {
      //   width: 200,
      // },
    },
  },
  menuIcon: {
    marginRight: 24,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
  },
  logo: {
    maxWidth: 200,
    marginRight: 58,
  },
  searchBox: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchForm: {
    display: 'flex',
  },
  searchButton: {
    color: '#ffffff',
  },
}));

const useStylesm = makeStyles(theme => ({
  appbar: {
    marginTop: theme.spacing(0),
    // paddingTop: 14,
    width: '100%',
    height: 46,
    // paddingLeft: 22,
    // paddingRight: 14,
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
  },
  menuButton: {
    flex: 1,
    // border: 'solid 1px transparent',
    // paddingTop: 9,
  },
  title: {
    flex: 5,
    paddingTop: 13,
    // paddingLeft: 10,
  },
  myinfo: {
    // flex: 1,
    textAlign: 'right',
  },
  logo: {
    maxWidth: 80,
  },
  drawer: {
    width: 280,
  },
  login: {
    padding: 14,
  },
  button: {
    padding: 0,
    maxWidth: 120,
    width: '100%',
  },
  buttonSignin: {
    margin: 4,
  },
  link: {
    textDecoration: 'none',
    userSelect: 'none',
    color: '#4d4d4d',
    // color: '#ffffff',
  },
  signinHead: {
    backgroundColor: '#4d85f1',
    height: 60,
    display: 'flex',
    width: '100%',
  },
  logoHead: {
    maxWidth: 120,
    paddingLeft: 19,
    paddingTop: 18,
  },
  buttonSignout: {
    maxWidth: 200,
    width: '100%',
  },
  buttonSignoutWrap: {
    padding: 10,
    textAlign: 'center',
  },
  levelIcon: {
    // paddingTop: 24,
  },
  levelIconWrap: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  levelTextWrap: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  menuCustom: {
    display: 'flex',
    padding: '0 24px 0 24px',
    minHeight: 48,
    alignItems: 'center',
    transition:
      'min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  searchWrap: {
    backgroundColor: '#e3edff',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e3edff',
    border: 0,
    '&:focus': { outline: 'none' },
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

function Header({ isSignin, signoutAction, userData }) {
  useInjectReducer({ key: 'header', reducer });
  useInjectSaga({ key: 'header', saga });
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { history } = useReactRouter();
  const [menu, setMenu] = React.useState(false);
  const [savePass, setSavePass] = React.useState(false);
  const handleNavi = path => {
    history.push(`/${path}`);
    setMenu(false);
  };
  useEffect(() => {
    if (localStorage.getItem('savePass') === 'true') {
      setSavePass(true);
    }
  }, []);
  // console.log(userData);
  const handleSignout = () => {
    // console.log('signput');
    if (!savePass) {
      localStorage.removeItem('usernameSave');
      localStorage.removeItem('passwordSave');
      localStorage.removeItem('savePass');
    }
    signoutAction();
  };
  // const handleSearch = event => {
  //   console.log(event.target.value);
  // };

  const onSubmitFormInit = event => {
    event.preventDefault();
    const searchBool = Boolean(event.target.search.value);
    if (searchBool) {
      // console.log(event.target.search.value);
      const param = encodeURIComponent(event.target.search.value);

      history.push(`/search?search=${param}`);
    }
    if (matches) {
      setMenu(false);
    }
  };
  const handleToggle = () => {
    setSavePass(!savePass);
  };
  // console.log(isSignin);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.link}>
            <img src={LogoImage} className={classes.logo} alt="logo" />
          </Link>
          <div className={classes.grow}>
            {/* <TopMenu /> */}
            {menuArry &&
              menuArry.map(menuTitle => (
                <TopMenu
                  menuTitle={menuTitle}
                  selected={0}
                  key={menuTitle.menuId + Math.random()}
                />
              ))}
          </div>
          {/* <div className={classes.search}>
            <div
              className={classes.searchIcon}
              onClick={onSubmitFormInit}
              role="presentation"
            >
              <SearchIcon />
            </div>
            <form onSubmit={onSubmitFormInit}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                
                inputProps={{
                  maxLength: 20,
                }}
                name="search"
              />
            </form>
          </div> */}

          <div className={classes.searchBox}>
            <form onSubmit={onSubmitFormInit} className={classes.searchForm}>
              <Button className={classes.searchButton} type="submit">
                <SearchIcon />
              </Button>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                // onClick={onSubmitFormInit}
                // type="submit"
                inputProps={{
                  maxLength: 20,
                }}
                name="search"
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      {matches && (
        <AppBar position="fixed" className={classesm.appbar}>
          <div className={classesm.toolbar}>
            <Button
              className={classesm.menuButton}
              type="button"
              onClick={() => setMenu(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
              >
                <g
                  fill="#FFF"
                  fillRule="evenodd"
                  transform="matrix(-1 0 0 1 20 0)"
                >
                  <rect width="20" height="2.286" rx="1" />
                  <rect width="13.6" height="2.286" x="6.4" y="6.857" rx="1" />
                  <rect width="20" height="2.286" y="13.714" rx="1" />
                </g>
              </svg>
            </Button>
            <div className={classesm.title}>
              <Link to="/" className={classes.link}>
                <img src={LogoImage} className={classesm.logo} alt="logo" />
              </Link>
            </div>
            <div className={classesm.myinfo}>
              <IconButton
                className={classes.button}
                onClick={() => handleNavi('chat')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                >
                  <path
                    fill="#FFF"
                    fillRule="evenodd"
                    d="M13.05 9.012c.62 0 1.125-.519 1.125-1.158 0-.639-.505-1.157-1.125-1.157s-1.125.518-1.125 1.157c0 .64.505 1.158 1.125 1.158zm-4.05 0c.62 0 1.125-.519 1.125-1.158 0-.639-.505-1.157-1.125-1.157s-1.125.518-1.125 1.157c0 .64.505 1.158 1.125 1.158zm-4.05 0c.62 0 1.125-.519 1.125-1.158 0-.639-.505-1.157-1.125-1.157s-1.125.518-1.125 1.157c0 .64.505 1.158 1.125 1.158zM18 7.734c0 4.676-5.049 9.046-11.976 7.308C4.766 15.835 1.99 16.638.04 17c.729-1.476 1.537-3.505 1.494-4.919A6.941 6.941 0 0 1 0 7.734C0 3.265 4.247 0 9 0c4.724 0 9 3.24 9 7.734zm4 6.214c0 1.034-.37 2.05-1.028 2.839-.027.923.514 2.249 1.001 3.213-1.305-.238-3.163-.761-4.004-1.28-3.097.755-5.626-.267-6.969-1.94 4.194-.608 7.583-3.284 8.732-6.78 1.362.904 2.268 2.3 2.268 3.948z"
                  />
                </svg>
              </IconButton>
              {isSignin ? (
                <IconButton
                  className={classes.button}
                  onClick={() => handleNavi('mypage')}
                >
                  <img src={SigninImage} alt="" width="24" />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.button}
                  onClick={() => handleNavi('signin')}
                >
                  <img src={SigninImage} alt="" width="24" />
                </IconButton>
              )}
            </div>
          </div>
          <Drawer open={menu} onClose={() => setMenu(false)}>
            <div className={classesm.drawer}>
              {isSignin && userData ? (
                <div
                  className={classesm.signinHead}
                  onClick={() => handleNavi('exphistory')}
                  role="presentation"
                >
                  {/* <span>
                    <img
                      src={LogoImage}
                      className={classesm.logoHead}
                      alt="logo"
                    />
                  </span> */}
                  <span className={classesm.levelIconWrap}>
                    <LevelIcon
                      level={userData.memberLevel}
                      className={classesm.levelIcon}
                    />
                  </span>
                  <span className={classesm.levelTextWrap}>
                    계급&nbsp;:&nbsp;
                    {userData && (
                      <LevelText
                        level={userData.memberLevel}
                        // className={classesm.levelIcon}
                      />
                    )}
                  </span>
                </div>
              ) : (
                <div className={classesm.login}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classesm.buttonSignin}
                    classes={{
                      root: classesm.button,
                    }}
                    onClick={() => handleNavi('signin')}
                  >
                    로그인
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    classes={{
                      root: classesm.button,
                    }}
                    onClick={() => handleNavi('signup')}
                  >
                    회원가입
                  </Button>
                </div>
              )}
              <form onSubmit={onSubmitFormInit}>
                <div className={classesm.searchWrap}>
                  <input
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    className={classesm.searchInput}
                    maxLength="20"
                    name="search"
                  />
                  <IconButton
                    aria-label=""
                    className={classes.margin}
                    type="submit"
                    // onClick={handleSearch}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="19"
                      viewBox="0 0 17 19"
                    >
                      <path
                        fill="#3B69C1"
                        fillRule="evenodd"
                        d="M12.873 12.733l4.13 4.453-1.229 1.148L11.57 13.8a7.5 7.5 0 1 1 1.303-1.068zM7.5 13.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                      />
                    </svg>
                  </IconButton>
                </div>
              </form>
              <div>
                {menuArry &&
                  menuArry.map(menuTitle => (
                    <TopMenuMobile
                      menuTitle={menuTitle}
                      selected={0}
                      key={menuTitle.menuId}
                      setMenu={setMenu}
                    />
                  ))}
                <div className={classesm.menuCustom}>
                  <Typography className={classesm.heading}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="13"
                      viewBox="0 0 11 13"
                    >
                      <path
                        fill="#313131"
                        fillRule="evenodd"
                        d="M6.6 0v1.358l-5.5 2.27v5.668L0 9.75V2.723L6.6 0zM4.4 5.973L11 3.25v7.026L4.4 13V5.973zm4.4-4.348v1.358l-5.5 2.27v5.668l-1.1.454V4.349l6.6-2.724z"
                      />
                    </svg>
                    {` `}

                    <Link
                      to="/chat"
                      className={classes.link}
                      onClick={handleNavi}
                    >
                      채팅
                    </Link>
                  </Typography>
                </div>
              </div>
              {isSignin && (
                <div className={classesm.buttonSignoutWrap}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classesm.buttonSignout}
                    classes={{
                      root: classesm.button,
                    }}
                    onClick={handleSignout}
                  >
                    로그아웃
                  </Button>
                  <div className={classesm.linkWrap}>
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
              )}
            </div>
          </Drawer>
        </AppBar>
      )}
    </div>
  );
}

Header.propTypes = {
  isSignin: PropTypes.any,
  signoutAction: PropTypes.func,
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signoutAction: () => {
      // console.log('signout call');
      dispatch(signout());
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
)(Header);

export const menuArry = [
  {
    title: '코인놀자',
    // menuId: 1,
    menuId: 0,
    subMenus: [
      { title: '코인정보', menuId: 1 },
      { title: '차트분석', menuId: 2 },
      { title: '코인일정', menuId: 99, link: 'coinschedule' },
      { title: '코인놀자 개선문의하기', menuId: 61 },
      // { title: '공지사항', menuId: 3 },
      { title: '코인놀자전문가 분석방', menuId: 54 },
    ],
  },
  {
    title: '커뮤니티',
    // menuId: 5,
    menuId: 0,
    subMenus: [
      { title: '자유게시판', menuId: 5 },

      {
        title: 'VIP 소령 소통방',
        menuId: 55,
        role: 'ROLE_VIP|ROLE_VVIP',
        level: 12,
      },
      { title: 'VVIP 원수 소통방', menuId: 56, role: 'ROLE_VVIP', level: 19 },

      { title: '코인추천 게시판', menuId: 57 },
      { title: '손익인증 게시판', menuId: 6 },
      { title: '질문/답변', menuId: 58 },
      { title: '유머/감동', menuId: 7 },
      { title: 'HOT게시물', menuId: 59 },
      { title: '추천게시물', menuId: 60 },
      { title: '가입인사', menuId: 8 },
      { title: '출석체크', menuId: 9, link: 'calendarcheck' },
    ],
  },
  {
    title: '포럼',
    // menuId: 10,
    menuId: 0,
    wide: true,
    subMenus: [
      { title: '비트코인', menuId: 10 },
      { title: '비트코인캐시', menuId: 11 },
      { title: '이더리움', menuId: 12 },
      { title: '이더리움 클래식', menuId: 13 },
      { title: '리플', menuId: 14 },
      { title: '라이트코인', menuId: 15 },

      { title: 'ICO/IEO', menuId: 21 },
      { title: '비트코인에스브이', menuId: 22 },
      { title: '비트코인골드', menuId: 23 },
      { title: '대시', menuId: 24 },
      { title: '모네로', menuId: 25 },
      { title: '퀸텀', menuId: 26 },
      { title: '제트캐시', menuId: 27 },
      { title: '이오스', menuId: 28 },
      { title: '에이다', menuId: 29 },
      { title: '아인스타이늄', menuId: 30 },
      { title: '트론', menuId: 31 },
      { title: 'NXT/이그니스', menuId: 32 },

      { title: 'SNT', menuId: 33 },
      { title: '스텔라루멘', menuId: 34 },
      { title: '시아코인', menuId: 35 },
      { title: '버지', menuId: 36 },

      { title: '아더', menuId: 37 },
      { title: '네오', menuId: 38 },
      { title: '아이콘', menuId: 39 },
      { title: '스톰', menuId: 40 },
      { title: '그로스톨코인', menuId: 41 },
      { title: '미스릴/골렘/엘', menuId: 42 },
      { title: '오미세고', menuId: 43 },
      { title: '펀디엑스', menuId: 44 },
      { title: '모나코', menuId: 45 },
      { title: '카이버네트워크', menuId: 46 },

      { title: '기프토', menuId: 47 },
      { title: '레드코인', menuId: 48 },
      { title: '질리카', menuId: 49 },
      { title: 'CNN', menuId: 50 },
      { title: '캡', menuId: 51 },
      { title: '덱스', menuId: 52 },
      { title: '넥시', menuId: 53 },
    ],
  },
  {
    title: '갤러리',
    // menuId: 16,
    menuId: 0,
    subMenus: [
      { title: '연예인 갤러리', menuId: 16 },
      { title: '핸드폰 사진 갤러리', menuId: 17 },
    ],
  },
  {
    title: '장터',
    // menuId: 18,
    menuId: 0,
    subMenus: [
      { title: '채굴장터', menuId: 18 },
      { title: '기타장터', menuId: 19 },
    ],
  },
  {
    title: '거래소/차트',
    menuId: 0,
    subMenus: [
      {
        title: '국내거래소',
        menuId: 0,
        pclink: 'excahngelist/1',
        subMenus: [
          { title: '빗썸', menuId: 0, link: 'https://www.bithumb.com/' },
          { title: '업비트', menuId: 0, link: 'https://www.upbit.com/' },
          { title: '코인원', menuId: 0, link: 'https://coinone.co.kr/' },
          { title: '코빗', menuId: 0, link: 'https://www.korbit.co.kr/' },
          {
            title: '코인네스트',
            menuId: 0,
            link: 'https://www.coinnest.co.kr/',
          },
          {
            title: '후오비코리아',
            menuId: 0,
            link: 'https://www.huobi.co.kr/ko-KR/',
          },
          {
            title: '오케이코인코리아',
            menuId: 0,
            link: 'https://okcoinkr.com/',
          },
          {
            title: '코인제스트',
            menuId: 0,
            link: 'https://www.coinzest.co.kr/',
          },
          { title: '비트젯', menuId: 0, link: 'https://www.bitzet.co.kr/' },
          {
            title: '캐셔레스트',
            menuId: 0,
            link: 'https://www.cashierest.com/',
          },
          { title: '코인이즈', menuId: 0, link: 'https://www.coinis.co.kr/' },
          { title: '바이맥스', menuId: 0, link: 'https://www.bimax.io/' },
          { title: '네임빗', menuId: 0, link: 'https://new.namebit.co.kr/' },
          { title: '코인빗', menuId: 0, link: 'https://www.coinbit.co.kr/' },
          { title: '뉴비트', menuId: 0, link: 'http://newbitkorea.com/' },
          { title: '알트메카', menuId: 0, link: 'https://www.altmeca.com/' },
          { title: '에스빗', menuId: 0, link: 'https://s-bit.co.kr/' },
          { title: '케이덱스', menuId: 0, link: 'https://kdex.io/' },
          { title: '나인빗', menuId: 0, link: 'https://ninebit.io/' },
        ],
      },
      {
        title: '해외거래소',
        menuId: 0,
        pclink: 'excahngelist/2',
        subMenus: [
          { title: '바이낸스', menuId: 0, link: 'https://www.binance.com/' },
          {
            title: '비트파이넥스',
            menuId: 0,
            link: 'https://www.bitfinex.com/',
          },
          { title: '비트플라이어', menuId: 0, link: 'https://bitflyer.jp/ko/' },
          { title: '비트렉스', menuId: 0, link: 'https://bittrex.com/' },
          { title: '폴로닉스', menuId: 0, link: 'https://poloniex.com/' },
          { title: '오케이코인', menuId: 0, link: 'https://www.okcoin.cn/' },
          { title: '비둘기지갑', menuId: 0, link: 'https://dovewallet.com/' },
          { title: 'CHBTC', menuId: 0, link: 'https://www.chbtc.com/' },
          { title: '크라켄', menuId: 0, link: 'https://www.kraken.com/' },
          { title: 'GDAX', menuId: 0, link: 'https://www.gdax.com/' },
          { title: '후오비', menuId: 0, link: 'https://www.huobi.com/' },
          { title: '비트스탬프', menuId: 0, link: 'https://www.bitstamp.net/' },
          { title: '빗컴', menuId: 0, link: 'http://bitcom.com/' },
        ],
      },
      {
        title: '차트/시세',
        menuId: 0,
        pclink: 'excahngelist/3',
        subMenus: [
          { title: '코인마켓캡', menuId: 0, link: 'http://coinmarketcap.com/' },
          {
            title: '크립토워치',
            menuId: 0,
            link: 'https://cryptowat.ch/',
          },
          {
            title: '비트코인위즈덤',
            menuId: 0,
            link: 'https://bitcoinwisdom.com/',
          },
          {
            title: '프로차트',
            menuId: 0,
            link: 'https://coinone.co.kr/chart/',
          },
          { title: 'Luka7', menuId: 0, link: 'http://luka7.net/' },
          { title: '와이즈바디', menuId: 0, link: 'http://wisebody.co.kr' },
        ],
      },
    ],
  },
  {
    title: '공지',
    // menuId: 3,
    menuId: 0,
    subMenus: [
      { title: '공지사항', menuId: 3 },
      { title: '문의게시판', menuId: 63, link: 'myqna' },
      { title: '광고 제휴문의', menuId: 100, link: 'partnership' },
    ],
  },
];
