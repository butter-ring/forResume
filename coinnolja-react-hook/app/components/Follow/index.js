/**
 *
 * Follow
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import request from 'utils/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 330,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    outline: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function Follow({ openfollow, closefollow, member }) {
  const [open, setOpen] = React.useState(false);
  // const [openm, setOpenm] = React.useState(false);
  const [targetMemberName, setTargetMemberName] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('친구 추가 하시겠습니까?');
  const [msg2, setMsg2] = useState('님을');
  const [buttondis, setButtondis] = useState(true);
  const classes = useStyles();
  // const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [modalStyle] = React.useState(getModalStyle);

  // console.log(targetMemberId);

  useEffect(() => {
    setOpen(openfollow);
    setTargetMemberName(member);
    if (openfollow) {
      clickHandler('');
    }
  }, [openfollow, member]);

  const handleFollowSave = () => {
    closefollow();
    clickHandler('save');
  };

  const handleFollowDel = () => {
    closefollow();
    clickHandler('del');
  };

  const handleCloseModal = () => {
    closefollow();
  };

  // function handleClose() {
  //   closefollow();
  // }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const clickHandler = async path => {
    console.log('::::clickHandler::clickHandler::::');
    setLoading(true);
    // console.log(readsavedel);
    // console.log(e);

    //  url = "/api/follow"+{readsavedel};

    const options = {
      method: 'POST',
      auth: true,
      data: {
        targetMemberName,
      },
    };
    // console.log(options);

    // try {
    //   const response = await request(`/api/follow`, options);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err.response);
    // }

    try {
      const response = await request(`/api/follow/${path}`, options);
      console.log(response);
      // if (e === 'save') {
      //   console.log('저장함');
      // } else if (e === 'del') {
      //   console.log('삭제함');
      //   setMsg('친구 추가 하시겠습니까?');
      //   setMsg2('님을');
      //   setButtondis(true);
      // }
    } catch (err) {
      console.log(err.response);

      if (err.response.data.code === 500118) {
        setMsg('이미 친구로 등록돼있습니다.');
        setMsg2('님은');
        setButtondis(false);
      }
      if (err.response.data.code === 500107) {
        setMsg('친구 추가 하시겠습니까?');
        setMsg2('님을');
        setButtondis(true);
      }
    }
    setLoading(false);
  };
  // PC 화면
  return (
    <React.Fragment>
      {loading && <CircularProgress />}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paper} align="center">
          <Typography variant="h6" id="simple-modal-description">
            {targetMemberName} {msg2}
          </Typography>
          <Typography variant="h6" id="simple-modal-description">
            {msg}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            size="medium"
            color="primary"
            align="center"
            className={classes.button}
          >
            닫기
          </Button>
          {buttondis ? (
            <Button
              onClick={handleFollowSave}
              variant="outlined"
              size="medium"
              color="primary"
              align="right"
              className={classes.button}
            >
              친구추가
            </Button>
          ) : (
            <Button
              onClick={handleFollowDel}
              variant="outlined"
              size="medium"
              color="primary"
              align="right"
              className={classes.button}
            >
              친구끊기
            </Button>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}

Follow.propTypes = {
  openfollow: PropTypes.func.isRequired,
  closefollow: PropTypes.func.isRequired,
  member: PropTypes.func.isRequired,
};

export default Follow;
