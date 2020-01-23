/**
 *
 * Partnership
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import request from 'utils/request';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'redux';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import saga from './saga';

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    flexGrow: 1,
    // marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  myPageWrapper: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    minHeight: 800,
  },
  content: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  myPageTopWrapper: {
    display: 'flex',
  },
  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    minWidth: 300,
    // width: '100%',
    height: 41,
    marginLeft: 14,
    marginTop: 22,
  },
  myPageTitleText: {
    fontSize: 28,
    minWidth: 300,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },

  button: {
    width: 220,
    height: 43,
    borderRadius: 3,
    backgroundColor: '#4d85f1',
    marginTop: 35,
  },
  buttontext: {
    width: 100,
    height: 23,
    fontFamily: 'NotoSansCJKkr',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  paper: {
    position: 'absolute',
    width: 230,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  // buttondisabled: {
  //   width: 160,
  //   height: 43,
  //   borderRadius: 3,
  //   backgroundColor: '#a6a6a6',
  // },
  // material-ui CSS
  // material-ui CSS
  // material-ui CSS
  container: {
    // display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(1),
    width: 400,
  },
  densem: {
    marginTop: theme.spacing(1),
    width: 300,
  },
  menu: {
    width: 200,
  },
}));

export function Partnership() {
  useInjectSaga({ key: 'partnership', saga });

  const classes = styles();
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hcontent, setHcontent] = useState(' ');
  const [hphone, setHphone] = useState(' ');
  const [hname, setHname] = useState(' ');
  const [hemail, setHemail] = useState(' ');
  const [openm, setOpenm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  const handleEmail = e => {
    setEmail(e.target.value);
    setHemail(' ');
  };
  const handleName = e => {
    setName(e.target.value);
    setHname(' ');
  };
  const handlePhone = e => {
    setPhone(e.target.value);
    setHphone(' ');
  };
  const handleContent = e => {
    setHcontent(`${content.length} / 800`);
    setContent(e.target.value);
  };
  const handleOpenModal = () => {
    setOpenm(true);
  };
  const handleCloseModal = () => {
    setOpenm(false);
    setEmail('');
    setName('');
    setPhone('');
    setContent('');
    setHcontent(' ');
  };
  const clickHandler = async () => {
    console.log('fafafaf');
    setLoading(true);

    if (!email) {
      setHemail('이메일을 입력해 주세요.');
      setLoading(false);
      return;
    }
    if (!name) {
      setHname('담당자명을 입력해 주세요.');
      setLoading(false);
      return;
    }
    if (!phone) {
      setHphone('전화번호를 입력해 주세요.');
      setLoading(false);
      return;
    }
    if (!content) {
      setHcontent('내용을 입력해 주세요.');
      setLoading(false);
      return;
    }
    if (content.length > 800) {
      setHcontent('제휴문의 내용은 800자 까지입니다.');
      setLoading(false);
      return;
    }
    if (content.length < 30) {
      setHcontent('제휴문의 내용은 30자 이상 입력해주세요.');
      setLoading(false);
      return;
    }
    const options = {
      method: 'POST',
      auth: true,
      data: {
        name,
        email,
        phone,
        content,
      },
    };

    try {
      const response = await request(`/api/partnership`, options);
      console.log(response);
      handleOpenModal();
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  // 모바일 화면
  if (matches) {
    return (
      <React.Fragment>
        {loading && <LinearProgress />}
        <div className={classes.root}>
          <div className={classes.myPageWrapper}>
            <div className={classes.content}>
              <div className={classes.myPageTitle}>
                <Typography align="center" className={classes.myPageTitleText}>
                  제휴문의
                </Typography>
              </div>
              <br />
              <Divider />
              <br />
              <div
                align="center"
                className={classes.container}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="email"
                    align="left"
                    type="email"
                    name="email"
                    label="email"
                    helperText={hemail}
                    className={clsx(classes.textField, classes.densem)}
                    margin="dense"
                    variant="outlined"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div>
                  <TextField
                    id="name"
                    align="left"
                    label="담당자명"
                    helperText={hname}
                    className={clsx(classes.textField, classes.densem)}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    value={name}
                    onChange={handleName}
                  />
                </div>
                <div>
                  <TextField
                    id="phone"
                    align="left"
                    label="연락처"
                    helperText={hphone}
                    className={clsx(classes.textField, classes.densem)}
                    margin="dense"
                    variant="outlined"
                    value={phone}
                    onChange={handlePhone}
                  />
                </div>
                <div>
                  <TextField
                    id="content"
                    align="left"
                    label="제휴내용"
                    helperText={hcontent}
                    className={clsx(classes.textField, classes.densem)}
                    margin="dense"
                    type="text"
                    variant="outlined"
                    value={content}
                    multiline
                    onChange={handleContent}
                    rows="9"
                    fullWidth
                  />
                </div>
                <div>
                  <Button className={classes.button} onClick={clickHandler}>
                    <span className={classes.buttontext}>제휴문의 하기</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openm}
          onClose={handleCloseModal}
        >
          <div style={modalStyle} className={classes.paper} align="center">
            <Typography variant="h6" id="simple-modal-description">
              제휴문의 전송완료.
            </Typography>
            <br />
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              size="medium"
              color="primary"
              align="center"
            >
              닫기
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  } // 모바일 화면 끝

  return (
    <React.Fragment>
      {loading && <LinearProgress />}
      <div className={classes.root}>
        <div className={classes.myPageWrapper}>
          <div className={classes.content}>
            <div className={classes.myPageTitle}>
              <Typography align="center" className={classes.myPageTitleText}>
                제휴문의
              </Typography>
            </div>
            <br />
            <Divider />
            <br />
            <div
              align="center"
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="email"
                  align="left"
                  type="email"
                  name="email"
                  label="email"
                  helperText={hemail}
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div>
                <TextField
                  id="name"
                  align="left"
                  label="담당자명"
                  helperText={hname}
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  value={name}
                  onChange={handleName}
                />
              </div>
              <div>
                <TextField
                  id="phone"
                  align="left"
                  label="연락처"
                  helperText={hphone}
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                  value={phone}
                  onChange={handlePhone}
                />
              </div>
              <div>
                <TextField
                  id="content"
                  align="left"
                  label="제휴내용"
                  helperText={hcontent}
                  className={clsx(classes.textField, classes.dense)}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  value={content}
                  multiline
                  onChange={handleContent}
                  rows="9"
                  fullWidth
                />
              </div>
              <div>
                <Button className={classes.button} onClick={clickHandler}>
                  <span className={classes.buttontext}>제휴문의 하기</span>
                </Button>
              </div>
            </div>
            {/* <TextField
          autoFocus
          margin="dense"
          label="111"
          helperText='헬퍼텍스트'
          type="text"
          id="receiverUsername"
          name="receiverUsername"
          value="값"
          onChange={handlecontent}
          fullWidth
        />
        <TextField
          multiline
          margin="dense"
          label="222"
            helperText='헬퍼텍스트'
          type="text"
          id="content"
          name="content"
          value="값"
          onChange={handlecontent}
          rows="4"
          fullWidth
        /> */}
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openm}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paper} align="center">
          <Typography variant="h6" id="simple-modal-description">
            제휴문의 전송완료.
          </Typography>
          <br />
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            size="medium"
            color="primary"
            align="center"
          >
            닫기
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
} // PC 화면 끝

Partnership.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Partnership);
