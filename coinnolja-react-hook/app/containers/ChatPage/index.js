/**
 *
 * ChatPage
 *
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import TrollBox from 'components/TrollBox';
import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';

import useWebSocket from 'react-use-websocket';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import LevelIcon from 'components/LevelIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';

import makeSelectChatPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    marginTop: 14,
    flexGrow: 1,
    fontFamily: 'NotoSansCJKkr',
    border: 'solid 1px #bbc9e0',
    backgroundColor: '#f3f8ff',
    height: 616,
    // height: '100vh',
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      height: 350,
      // height: '45vh',
      // height: '100%',
      // marginBottom: 12,
    },
  },
  chatContent: {
    maxHeight: 524,
    overflow: 'auto',
    overflowY: 'scroll',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: 240,
      // height: '28vh',
      // height: '100%',
      // marginBottom: 12,
    },
  },
  chatBox: {
    height: 68,
    borderTop: 'solid 1px #bbc9e0',
    backgroundColor: '#e3edff',
    top: 'auto',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  chatInputWrap: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    margin: '0 auto',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    transform: 'translateY(-50%)',
    '-moz-transform': 'translateY(-50%)',
    '-webkit-transform': 'translateY(-50%)',
    paddingLeft: 10,
  },
  chatInput: {
    width: 190,
    height: 38,
    border: 'solid 1px #a6a6a6',
    backgroundColor: '#ffffff',
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: 265,
    },
  },
  triangleTopleft: {
    width: 0,
    height: 0,
    borderTop: '24px solid #4d85f1',
    borderRight: '24px solid transparent',
  },
  listRoot: {
    paddingTop: 0,
  },
  listAvatar: {
    height: 24,
    width: 24,
    minWidth: 30,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  username: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#313131',
  },
  messageContent: {
    fontSize: 13,
    fontWeight: 'normal',
    color: '#4d4d4d',
  },
  listItem: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  signinRequired: {
    textAlign: 'center',
    paddingTop: 20,
  },
  noti: {
    display: 'flex',
  },
  notiText: {
    paddingTop: 10,
    paddingLeft: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff0000',
  },
}));

const CONNECTION_STATUS_OPEN = 1;

export function ChatPage({ isSignin, userData }) {
  useInjectReducer({ key: 'chatPage', reducer });
  useInjectSaga({ key: 'chatPage', saga });
  const classes = useStyles();
  const [socketUrl, setSocketUrl] = useState(process.env.CHAT_URL);
  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);
  const [messageHistory, setMessageHistory] = useState([]);

  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(process.env.CHAT_URL),
    [],
  );

  // console.log(userData);
  const handleClickSendMessage = useCallback(() => {
    if (message) {
      sendMessage(
        `{"type":"chat","message":"${message}", "username":"${
          userData.nickName
        }", "userLevel":${userData.memberLevel}}`,
      );
    }

    setMessage('');
  }, [message]);

  const handleEnter = event => {
    if (event.key === 'Enter') {
      handleClickSendMessage();
    }
  };

  const handleMessage = event => {
    setMessage(event.target.value);
  };

  const scrollToBottom = () => {
    // alert(messagesEndRef.current.id);
    // messagesEndRef.current.scrollIntoView({
    //   inline: 'end',
    //   block: 'nearest',
    //   // behavior: 'smooth',
    // });
    messagesEndRef.current.scrollIntoView(false);
  };
  // console.log(this.scrollable.scrollHeight);
  // console.log(this.scrollable.clientHeight);
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
      // scrollToBottom();
    }
    return () => {
      // console.log('cleanup1');
    };
  }, [lastMessage]);

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div className={classes.root}>
      <div className={classes.noti}>
        <div className={classes.triangleTopleft} />
        <div className={classes.notiText}>
          {readyState === CONNECTION_STATUS_OPEN &&
            '채팅이 글쓰기가 안될경우 새로고침 해주세요'}
        </div>
      </div>
      <div className={classes.chatContent}>
        <List className={classes.listRoot}>
          {messageHistory &&
            messageHistory.map(messageRaw => (
              // <span key={idx}>{message && JSON.parse(message.data).message}</span>
              <ListItem
                alignItems="flex-start"
                key={JSON.parse(messageRaw.data).uuid}
                className={classes.listItem}
              >
                <ListItemAvatar className={classes.listAvatar}>
                  {JSON.parse(messageRaw.data).userLevel && (
                    <LevelIcon level={JSON.parse(messageRaw.data).userLevel} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.username}
                        color="textPrimary"
                      >
                        {messageRaw && JSON.parse(messageRaw.data).username} :
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.messageContent}
                        color="textPrimary"
                      >
                        {messageRaw && JSON.parse(messageRaw.data).message}
                        {/* {JSON.parse(messageRaw.data).uuid} */}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
        </List>
        <div ref={messagesEndRef} id="messagesEndRef" />
      </div>

      <div className={classes.chatBox}>
        {isSignin ? (
          <div className={classes.chatInputWrap}>
            <input
              typ="text"
              className={classes.chatInput}
              onChange={handleMessage}
              value={message}
              maxLength={100}
              onKeyUp={handleEnter}
            />
            {readyState === CONNECTION_STATUS_OPEN ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClickSendMessage}
                disabled={readyState !== CONNECTION_STATUS_OPEN}
              >
                전송
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClickChangeSocketUrl}
                // disabled={readyState !== CONNECTION_STATUS_OPEN}
              >
                연결
              </Button>
            )}
          </div>
        ) : (
          <div className={classes.signinRequired}>
            로그인 후 사용가능합니다.
          </div>
        )}
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  isSignin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  chatPage: makeSelectChatPage(),
  isSignin: makeSelectSignin(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChatPage);
