/**
 *
 * SigninRequired
 *
 */

import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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

function SigninRequired() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  console.log(matches);
  return (
    <div className={classes.root}>
      <div className={classes.contentWrap}>
        <div>
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
                stroke="#f05c5c"
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
          <div className={classes.bodyText}>로그인이 필요한 페이지 입니다.</div>
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

SigninRequired.propTypes = {};

export default SigninRequired;

const CollisionLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/" {...props} />
));
