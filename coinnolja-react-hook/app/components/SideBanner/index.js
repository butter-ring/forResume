/**
 *
 * SideBanner
 *
 */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SideBannerImage from '../../images/banner/bithumbpc.gif';
// import SideBannerImage from '../../images/banner/upbit2.jpg';

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
function SideBanner() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a href="https://www.bithumb.com" target="_blank">
        <img src={SideBannerImage} alt="" className={classes.imgsize} />
      </a>
    </div>
  );
}

SideBanner.propTypes = {};

export default SideBanner;
