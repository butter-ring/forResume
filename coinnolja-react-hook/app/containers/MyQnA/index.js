/**
 *
 * MyQnA
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import request from 'utils/request';
// CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import MainCoinIndex from 'components/MainCoinIndex';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import MyQnAList from 'components/MyQnAList';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectSignin } from 'containers/App/selectors';
import TopBanner from 'components/TopBanner';
import NoticeLine from 'components/NoticeLine';
import NoticeList from 'components/NoticeList';
import NoticeListMobile from 'components/NoticeListMobile';
import { getMyQnAList, myQnANotice } from './actions';
import makeSelectMyQnA from './selectors';
import reducer from './reducer';
import saga from './saga';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f1f1f1',
    // flexGrow: 1,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  notice: {
    backgroundColor: '#ffffff',
    marginBottom: 14,
  },
  myPageWrapper: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
    // width: 884,
  },
  content: {
    backgroundColor: '#ffffff',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  buttonWrapper: {
    paddingBottom: 30,
    backgroundColor: '#ffffff',
    paddingRight: 40,
  },
  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    height: 41,
    marginLeft: 14,
    marginTop: 22,
    display: 'flex',
    justifyContent: 'space-between',
  },
  myPageTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  paper: {
    position: 'absolute',
    width: 230,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  noticeTitle: {
    fontFamily: 'NotoSansCJKkr',
    height: 41,
    marginLeft: 14,
    marginTop: 22,
  },
  topsWrapper: {
    paddingBottom: 50,
  },
}));

// mobile styles -----------------------------------------

const stylesm = makeStyles(theme => ({
  myPageTitle: {
    fontFamily: 'NotoSansCJKkr',
    width: '100%',
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    verticalAlign: 'middle',
    display: 'flex',
    justifyContent: 'space-between',
  },
  myPageTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    color: '#313131',
  },
  root: {
    backgroundColor: '#f1f1f1',
    flexGrow: 1,
    marginTop: theme.spacing(0),
    overflowX: 'auto',
  },
  myPageWrapper: {
    backgroundColor: '#ffffff',
    border: 'solid 1px #dedede',
  },
  content: {
    backgroundColor: '#ffffff',
  },
  grow: {
    flexGrow: 1,
  },
  myPageTopWrapper: {
    display: 'flex',
  },
  buttonWrapper: {
    fontFamily: 'NotoSansCJKkr',
  },
  button: {
    fontSize: 10,
    height: 25,
  },
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
  infotext: {
    // fontSize: 8,
  },
  noticeTitle: {
    fontFamily: 'NotoSansCJKkr',
    height: 20,
    marginLeft: 14,
    marginTop: 22,
    paddingBottom: 30,
  },
  topsWrapper: {
    paddingBottom: 30,
  },
}));

export function MyQnA({
  myQnA,
  myQnAListGet,
  isSignin,
  history,
  myQnANoticeGet,
}) {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const classesm = stylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  const [openm, setOpenm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [modalStyle] = React.useState(getModalStyle);

  // const [pageIndex] = useState(false);

  useInjectReducer({ key: 'myQnA', reducer });
  useInjectSaga({ key: 'myQnA', saga });

  const classes = styles();
  // const classesm = stylesm();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('xs'));

  if (isSignin !== true) {
    history.push('/');
  }

  function handleClose() {
    setOpen(false);
    setContent('');
    setTitle('');
    setOpen(false);
  }

  const handlecontent = e => {
    setContent(e.target.value);
  };

  const handleOpenModal = () => {
    setOpenm(true);
  };

  const handleCloseModal = () => {
    setOpenm(false);
  };

  const handleOpen = () => {
    setOpen(true);
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

    // useEffect(() => {
    //   setReceiverUsername(member);
    // }, [opennote, member]);

    const options = {
      method: 'POST',
      auth: true,
      data: {
        // senderId,
        title,
        content,
      },
    };

    try {
      const response = await request(`/api/myqna/save`, options);
      // console.log('myQnaSave 확인');
      // console.log(response);
      // setLabel('받는 사람');
      // setLabelcon('쪽지 내용');
      if (response) {
        pageload(0);
        handleClose();
        handleOpenModal();
      }
    } catch (err) {
      console.log(err.response);
      alert('작성 실패');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isSignin) {
      pageload(0);
      myQnANoticeGet();
    }
    // noteListGet(pageIndex);
  }, [isSignin]);

  const pageload = pagenum => {
    // console.log('==== click pageload ====');
    // console.log(pagenum);
    myQnAListGet(pagenum);
    return true;
  };

  console.log('index.js myQnANotice check');
  console.log(myQnA.tops);

  if (matches) {
    return (
      <div>
        <div className={classesm.myPageWrapper}>
          <div className={classesm.content}>
            <div className={classesm.topsWrapper}>
              <div className={classesm.noticeTitle}>
                <Typography className={classesm.myPageTitleText}>
                  공지 사항
                </Typography>
              </div>
              <NoticeListMobile tops={myQnA.tops} />
            </div>
            <div className={classesm.myPageTitle}>
              <Typography className={classesm.myPageTitleText}>
                내 문의 사항
              </Typography>
              <div className={classesm.buttonWrapper}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classesm.button}
                  onClick={handleOpen}
                >
                  문의하기
                </Button>
              </div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">문의하기</DialogTitle>
                <DialogContent>
                  <TextField
                    className={classesm.infotext}
                    autoFocus
                    placeholder="제목"
                    margin="normal"
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    multiline
                    type="text"
                    placeholder="내용"
                    id="content"
                    name="content"
                    value={content}
                    onChange={handlecontent}
                    rows="10"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="primary"
                  >
                    닫기
                  </Button>
                  <Button
                    onClick={clickHandler}
                    variant="outlined"
                    color="primary"
                  >
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
                <div
                  style={modalStyle}
                  className={classes.paper}
                  alnoticeTitleign="center"
                >
                  <Typography variant="h6" id="simple-modal-description">
                    작성 성공
                  </Typography>
                  <br />
                  <Button
                    onClick={handleCloseModal}
                    variant="outlined"
                    size="medium"
                    color="primary"
                  >
                    닫기
                  </Button>
                </div>
              </Modal>
            </div>
            <MyQnAList myQnA={myQnA.myQnA && myQnA.myQnA} pageload={pageload} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MainCoinIndex />
      <div className={classes.topBanner}>
        <TopBanner />
      </div>
      <div className={classes.notice}>
        <NoticeLine />
      </div>

      <div className={classes.myPageWrapper}>
        <div className={classes.content}>
          <div className={classes.topsWrapper}>
            <div className={classes.noticeTitle}>
              <Typography className={classes.myPageTitleText}>
                공지 사항
              </Typography>
            </div>
            <NoticeList tops={myQnA.tops} />
          </div>
          <Divider />
          <div className={classes.myPageTitle}>
            <Typography className={classes.myPageTitleText}>
              문의 사항
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                문의하기
              </Button>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth="md"
            >
              <DialogTitle id="form-dialog-title">문의하기</DialogTitle>
              <DialogContent>
                <TextField
                  className={classesm.infotext}
                  autoFocus
                  placeholder="제목"
                  margin="normal"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  fullWidth
                />
                <TextField
                  multiline
                  type="text"
                  placeholder="내용"
                  id="content"
                  name="content"
                  value={content}
                  onChange={handlecontent}
                  rows="10"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="primary"
                >
                  닫기
                </Button>
                <Button
                  onClick={clickHandler}
                  variant="outlined"
                  color="primary"
                >
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
              <div style={modalStyle} className={classes.paper} align="center">
                <Typography variant="h6" id="simple-modal-description">
                  작성 성공
                </Typography>
                <br />
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  size="medium"
                  color="primary"
                >
                  닫기
                </Button>
              </div>
            </Modal>
          </div>
          <MyQnAList myQnA={myQnA.myQnA && myQnA.myQnA} pageload={pageload} />
        </div>
      </div>
    </div>
  );
}

MyQnA.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  myQnA: PropTypes.any,
  myQnAListGet: PropTypes.func,
  myQnANoticeGet: PropTypes.func,
  isSignin: PropTypes.any,
  history: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myQnA: makeSelectMyQnA(),
  isSignin: makeSelectSignin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    myQnAListGet: page => {
      dispatch(getMyQnAList(page));
    },
    myQnANoticeGet: () => {
      dispatch(myQnANotice());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyQnA);
