/**
 *
 * SwiperSlide
 *
 */

import React from 'react';
import Swiper from 'react-id-swiper';
// eslint-disable-next-line import/no-unresolved
// import 'react-id-swiper/lib/styles/css/swiper.css';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles({
  root: {
    // width: 1200,
    // flexGrow: 1,
    height: 380,
    backgroundColor: 'gray',
  },
  paper: {
    marginTop: 'spacing(3)',
    width: '100%',
    overflowX: 'auto',
    marginBottom: 'spacing(2)',
  },
  table: {
    minWidth: 650,
  },
  container: {
    minHeight: 91,
    display: 'flex',
    flexWrap: 'wrap',
  },
  eachslider: {
    // width: '100%',
    marginTop: 10,
    height: 370,
    verticalAlign: 'center',
  },
}); // END userStyles

function SwiperSlide() {
  const classes = useStyles();

  const params = {
    // spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  return (
    <div className={classes.root}>
      <Swiper {...params} shouldSwiperUpdate>
        <div className={classes.eachslider}>Slide #1</div>
        <div className={classes.eachslider}>Slide #2</div>
        <div className={classes.eachslider}>Slide #3</div>
        <div className={classes.eachslider}>Slide #4</div>
      </Swiper>
    </div>
  );
}

SwiperSlide.propTypes = {};

export default SwiperSlide;
