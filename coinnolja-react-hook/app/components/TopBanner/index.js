/**
 *
 * TopBanner
 *
 */

import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TopBannerImage from '../../images/banner/upbitpc.gif';
import UpbitBanner from '../../images/banner/banner-upbit.gif';

const useStyles = makeStyles(theme => ({
  root: {
    border: 'solid 1px #dedede',
    backgroundColor: '#f1f1f1',
    marginTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(0),
    // display: 'flex',
  },
  imgsize: {
    // backgroundSize: '100% 100%',
    // backgroundSize: 'cover',
    objectFit: 'fill',
    width: '100%',
    height: '100%',
  },
}));
function TopBanner() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div className={classes.root}>
      <a href="https://www.upbit.com" target="_blank">
        <img
          src={matches ? UpbitBanner : TopBannerImage}
          alt=""
          className={classes.imgsize}
        />
      </a>
    </div>
  );
}

TopBanner.propTypes = {};

export default TopBanner;
