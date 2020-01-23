/**
 *
 * NoticePop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import NotiImg from '../../images/notice/noti-0618.png';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: '#093687',
    border: 'solid 3px #093687',
    backgroundColor: '#ffffff',
    marginTop: theme.spacing(0),
    // width: 600,
    maxWidth: 400,
    minHeight: 400,
    position: 'absolute',
    top: 40,
    left: 300,
    zIndex: 999,
    // padding: 20,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      // minHeight: 400,
      maxWidth: 300,
      top: 60,

      left: 10,
    },
  },
  body: {
    // padding: 20,
    maxWidth: 400,
  },
  footer: {
    color: '#ffffff',
    backgroundColor: '#093687',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
}));
function NoticePop({ open }) {
  const classes = useStyles();
  const handleClose = e => {
    // console.log(e.target.value);
    if (e.target.value === 'on') {
      const setDate = new Date();
      const setDateLong = setDate.getTime();
      localStorage.setItem('noticepopDay', setDateLong);
      open(false);
    }
  };
  return (
    <div className={classes.root}>
      {/* <div className={classes.header}>코인놀자 공지사항</div> */}
      <div className={classes.body}>
        {/* <p>★코인놀자 ETH / BTC 이벤트★</p>
        <p>- 대상 : 코인놀자 모든회원</p>
        <p>- 기간 : 선착순 5명(준장) / 선착순 1명(원수)</p>
        <p>
          - 내용 : 준장 계급 달성시 ETH 1개 지급 / 원수 계급 달성시 BTC 1개 지급
        </p>
        <p>
          - 설명 : 코인놀자 커뮤니티에서 우수한 활동을 하는 회원에게 부여하는
          ETH / BTC 지급 이벤트
        </p>
        <p>※ 알림</p>
        <p>선착순 달성시 마감되니 서두르세요!</p>
        <p>
          계급 달성한 회원께서는 코인놀자 관리자 메일로 본인의 계정정보와 ETH /
          BTC 주소를 보내주시면 관리자 확인 후 지급해드립니다
        </p> */}
        <img src={NotiImg} alt="" />
      </div>
      <div className={classes.footer}>
        하루동안 보지 않기{' '}
        <input type="checkbox" onChange={handleClose} name="noticeyn" />
      </div>
    </div>
  );
}

NoticePop.propTypes = {
  open: PropTypes.func.isRequired,
};

export default NoticePop;
