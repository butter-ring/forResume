/**
 *
 * Terms
 *
 */

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import classNames from 'classnames';
import Agree1 from 'components/SignupStep1/agree1';
import Agree2 from 'components/SignupStep1/agree2';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStylesm = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    paddingTop: theme.spacing(0),
  },

  contentWrap: {},
  content: {
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  contentSecond: {
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 29,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
  },
  divider: {
    backgroundColor: '#ffffff',
    borderBottom: 'solid 1px #dedede',
  },
  titleSub: {
    color: '#f05c5c',
    fontSize: 12,
    margin: 0,
  },
  checkAll: {
    fontSize: 14,
    // textAlign: 'right',
    marginTop: 16,
    // paddingRight: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 2,
  },
  agree: {
    border: 'solid 1px #bbc9e0',
  },
  agreeTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f8ff',
    borderBottom: 'solid 1px #bbc9e0',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
  },
  agreeTitleSub: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  agreeContentWrap: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    // maxHeight: 238,
  },
  agree2: {
    marginTop: 40,
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: 244,
    marginTop: 28,
  },
}));

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
    paddingBottom: 6,
    marginBottom: 14,
  },
  content: {
    backgroundColor: '#ffffff',
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 20,
    paddingBottom: 23,
  },
  contentSecond: {
    backgroundColor: '#ffffff',
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 14,
    paddingBottom: 29,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // borderBottom: 'solid 1px #dedede',
  },
  divider: {
    backgroundColor: '#ffffff',
    borderBottom: 'solid 1px #dedede',
  },
  titleSub: {
    color: '#f05c5c',
    fontSize: 14,
    margin: 0,
  },
  checkAll: {
    textAlign: 'right',
    marginTop: 11,
    paddingRight: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    paddingTop: 2,
  },
  agree: {
    border: 'solid 1px #bbc9e0',
  },
  agreeTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f8ff',
    borderBottom: 'solid 1px #bbc9e0',
    paddingLeft: 14,
    paddingRight: 14,
    alignItems: 'center',
  },
  agreeTitleSub: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  agreeContentWrap: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
    // maxHeight: 238,
  },
  agree2: {
    marginTop: 40,
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: 244,
    marginTop: 28,
  },
}));

function Terms() {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  if (matches) {
    return (
      <div className={classesm.root}>
        <div className={classesm.contentWrap}>
          <div className={classesm.content}>
            <div className={classesm.title}>이용약관 및 개인정보취급방침</div>
          </div>
          <Divider />
          <div className={classes.contentSecond}>
            <div className={classesm.agree}>
              <div className={classesm.agreeTitle}>
                <span className={classesm.agreeTitleSub}>• 회원가입약관</span>
              </div>
              <div className={classesm.agreeContentWrap}>
                <Agree1 />
              </div>
            </div>
            <div className={classNames(classesm.agree, classesm.agree2)}>
              <div className={classesm.agreeTitle}>
                <span className={classesm.agreeTitleSub}>
                  • 개인정보처리방침안내
                </span>
              </div>
              <div className={classesm.agreeContentWrap}>
                <Agree2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <div className={classes.title}>이용약관 및 개인정보취급방침</div>
        </div>
        <div className={classes.contentSecond}>
          <div className={classes.agree}>
            <div className={classes.agreeTitle}>
              <span className={classes.agreeTitleSub}>• 회원가입약관</span>
            </div>
            <div className={classes.agreeContentWrap}>
              <Agree1 />
            </div>
          </div>
          <div className={classNames(classes.agree, classes.agree2)}>
            <div className={classes.agreeTitle}>
              <span className={classes.agreeTitleSub}>
                • 개인정보처리방침안내
              </span>
            </div>
            <div className={classes.agreeContentWrap}>
              <Agree2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Terms.propTypes = {};

export default Terms;
