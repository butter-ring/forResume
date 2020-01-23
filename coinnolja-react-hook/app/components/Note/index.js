/**
 *
 * Note 쪽지버튼+쪽지기능
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/styles';
import request from 'utils/request';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import DialogContentText from '@material-ui/core/DialogContentText';

// const useStyles = makeStyles({
//   messegeBoxButton: {
//     width: 88,
//     height: 30,
//     borderRadius: 3,
//     border: 'solid 1px #979797',
//     fontFamily: 'NotoSansCJKkr',
//     fontSize: 13,
//     textAlign: 'center',
//     color: '#4d4d4d',
//     marginRight: 12,
//   },
// });

const useStylesm = makeStyles({
  messegeBoxButton: {
    width: 153,
    height: 30,
    fontSize: 12,
    textAlign: 'center',
    marginRight: 16,
    borderRadius: 3,
    // border: 'solid 1px #979797',
    fontFamily: 'NotoSansCJKkr',
  },
  dialogbox: {
    height: 180,
  },
});

const useStyles2 = makeStyles(theme => ({
  paper: {
    position: 'relative',
    width: 230,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

export function Note({ opennote, closenote, member }) {
  const [openm, setOpenm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const classes = useStyles();
  const classesmodal = useStyles2();
  const classesm = useStylesm();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const label = '받는 사람';
  const labelcon = '쪽지 내용';
  const [helper, setHelper] = useState(' ');
  const [helpercon, setHelpercon] = useState(' ');
  const [receiverUsername, setReceiverUsername] = useState('');
  const [modalStyle] = React.useState(getModalStyle);

  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    setOpen(opennote);
    setReceiverUsername(member);
  }, [opennote, member]);

  function handleClose() {
    setOpen(false);
    setContent('');
    setReceiverUsername('');
    setHelper(' ');
    setHelpercon(' ');
    closenote();
  }

  const handlecontent = e => {
    setContent(e.target.value);
    setHelpercon(`${content.length} / 200`);
  };

  const handleOpenModal = () => {
    setOpenm(true);
  };

  const handleCloseModal = () => {
    setOpenm(false);
  };

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const clickHandler = async () => {
    setLoading(true);

    if (!receiverUsername) {
      // setLabel('받는 사람 : 아이디를 입력해 주세요.');
      setHelper('아이디를 입력해 주세요.');
      setLoading(false);
      return;
    }
    if (!content) {
      // setLabelcon('쪽지 내용 : 내용을 입력해 주세요.');
      setHelpercon('내용을 입력해 주세요.');
      setLoading(false);
      return;
    }

    if (content.length > 200) {
      setHelpercon('쪽지 내용은 200자 까지입니다.');
      setLoading(false);
      return;
    }

    const options = {
      method: 'POST',
      auth: true,
      data: {
        // senderId,
        receiverUsername,
        content,
      },
    };

    try {
      const response = await request(`/api/note`, options);
      console.log(response);
      // setLabel('받는 사람');
      // setLabelcon('쪽지 내용');
      setHelper(' ');
      setHelpercon(' ');
      handleClose();
      handleOpenModal();
    } catch (err) {
      console.log(err.response);

      if (err.response.data.code === 500107) {
        setHelper('없는 아이디입니다.');
      }
    }
    setLoading(false);
  };

  // 모바일 화면
  if (matches) {
    return (
      <React.Fragment>
        {loading && <CircularProgress />}
        {/* <Button
          variant="outlined"
          className={classesm.messegeBoxButton}
          onClick={handleClickOpen}
        >
          쪽지 쓰기
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">쪽지쓰기</DialogTitle>
          <DialogContent paperWidthXs className={classesm.dialogbox}>
            <TextField
              autoFocus
              margin="small"
              label={label}
              helperText={helper}
              type="text"
              id="receiverUsername"
              name="receiverUsername"
              value={receiverUsername}
              onChange={e => setReceiverUsername(e.target.value)}
              fullWidth
            />
            <TextField
              multiline
              margin="small"
              label={labelcon}
              helperText={helpercon}
              type="text"
              id="content"
              name="content"
              value={content}
              onChange={handlecontent}
              rows="2"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="primary">
              닫기
            </Button>
            <Button onClick={clickHandler} variant="outlined" color="primary">
              보내기
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openm}
          onClose={handleCloseModal}
        >
          <div style={modalStyle} className={classesmodal.paper} align="center">
            <Typography variant="h6" id="simple-modal-description">
              쪽지 전송 완료.
            </Typography>
            <br />
            <Button
              onClick={handleCloseModal}
              className={classesmodal.button}
              variant="outlined"
              size="medium"
              color="primary"
            >
              닫기
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }

  // PC 화면
  return (
    <React.Fragment>
      {loading && <CircularProgress />}
      {/* <Button
        variant="outlined"
        className={classes.messegeBoxButton}
        onClick={handleClickOpen}
      >
        쪽지 쓰기
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">쪽지쓰기</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={label}
            helperText={helper}
            type="text"
            id="receiverUsername"
            name="receiverUsername"
            value={receiverUsername}
            onChange={e => setReceiverUsername(e.target.value)}
            fullWidth
          />
          <TextField
            multiline
            margin="dense"
            label={labelcon}
            helperText={helpercon}
            type="text"
            id="content"
            name="content"
            value={content}
            onChange={handlecontent}
            rows="4"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            닫기
          </Button>
          <Button onClick={clickHandler} variant="outlined" color="primary">
            보내기
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openm}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classesmodal.paper} align="center">
          <Typography variant="h6" id="simple-modal-description">
            쪽지 전송 완료.
          </Typography>

          <Button
            onClick={handleCloseModal}
            className={classesmodal.button}
            variant="outlined"
            size="medium"
            color="primary"
          >
            닫기
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
}
Note.propTypes = {
  opennote: PropTypes.func.isRequired,
  closenote: PropTypes.func.isRequired,
  member: PropTypes.func.isRequired,
};

export default Note;
