/**
 *
 * SignupStep3
 *
 */

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import NoticeLine from 'components/NoticeLine';
import TopBanner from 'components/TopBanner';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  contentWrap: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    paddingTop: 20,
    paddingBottom: 97,
    marginBottom: 14,
    position: 'relative',
    textAlign: 'center',
  },
  bodyText: {
    fontFamily: 'NotoSansCJKkr',
    color: '#313131',
    fontSize: 34,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  svgWrap: {
    paddingTop: 69,
    paddingBottom: 58,
  },
  divider: {
    marginTop: 24,
    marginBottom: 26,
  },
  infoText: {
    fontFamily: 'NotoSansCJKkr',
    color: '#313131',
    fontSize: 16,
    paddingLeft: 89,
    paddingRight: 90,
    lineHeight: 1.63,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 16,
      paddingRight: 16,
      fontSize: 12,
    },
  },
  button: {
    marginTop: 76,
    maxWidth: 244,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      marginTop: 30,
    },
  },
  blue: {
    fontWeight: 'bold',
    color: '#4d85f1',
  },
}));

function SignupStep3({ username }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      {!matches && (
        <div className={classes.topBanner}>
          <TopBanner />
        </div>
      )}
      {!matches && <NoticeLine />}
      <div className={classes.contentWrap}>
        <div className={classes.svgWrap}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="111"
            height="104"
            viewBox="0 0 111 104"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="#4D85F1"
              strokeLinecap="round"
            >
              <path
                fill="#F3F8FF"
                strokeWidth="4"
                d="M88.651 17.99C79.521 8.154 66.48 2 52 2 24.386 2 2 24.386 2 52s22.386 50 50 50 50-22.386 50-50c0-5.465-.877-10.726-2.498-15.649"
              />
              <path strokeWidth="5" d="M31 45.7l18.252 17.922L108.3 15" />
            </g>
          </svg>
        </div>
        <div className={classes.bodyText}>회원가입이 완료 되었습니다.</div>
        <div className={classes.bodyText}>
          <span className={classes.blue}>{username}</span>님의 회원가입을
          진심으로 축하합니다.
        </div>
        <Divider className={classes.divider} />
        <div className={classes.infoText}>
          회원님의 비밀번호는 아무도 알 수 없는 암호화 코드로 저장되므로
          안심하셔도 좋습니다.
          <br />
          {/* 아이디, 비밀번호 분실시에는 회원가입시 입력하신 이메일 주소를 이용하여
          찾을 수 있습니다. <br /> */}
          회원가입시 입력하신 이메일함을 확인하여 이메일 검증을 완료 해 주세요.
          <br />
          회원 탈퇴는 언제든지 가능하며 일정기간이 지난 후, 회원님의 정보는
          삭제하고 있습니다. <br />
          감사합니다.
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          // onClick={handleMain}
          component={CollisionLink}
        >
          메인으로
        </Button>
      </div>
    </div>
  );
}

SignupStep3.propTypes = {
  username: PropTypes.string,
};

export default memo(SignupStep3);

const CollisionLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/" {...props} />
));
