/**
 *
 * TrollBox
 *
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import useWebSocket from 'react-use-websocket';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { makeSelectUserData } from 'containers/App/selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import smoothscroll from 'smoothscroll-polyfill';

import Typography from '@material-ui/core/Typography';
import LevelIcon from 'components/LevelIcon';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    marginTop: 14,
    flexGrow: 1,
    fontFamily: 'NotoSansCJKkr',
    border: 'solid 1px #bbc9e0',
    backgroundColor: '#f3f8ff',
    height: 616,
    paddingTop: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      height: 460,
      // height: '100%',
      // marginBottom: 12,
    },
  },
  chatContent: {
    maxHeight: 524,
    overflow: 'auto',
    overflowY: 'scroll',
    position: 'relative',
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
    display: 'flex',
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
    paddingRight: 10,
  },
  chatInput: {
    // width: 190,
    // width: '100%',
    // maxWidth: '70%',
    flex: 1,
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

// const CONNECTION_STATUS_CONNECTING = 0;
const CONNECTION_STATUS_OPEN = 1;
// const CONNECTION_STATUS_CLOSING = 2;
// const CONNECTION_STATUS_CLOSED = 3;
smoothscroll.polyfill();
function TrollBox({ isSignin, userData }) {
  // window.__forceSmoothScrollPolyfill__ = true;

  const classes = useStyles();
  const [socketUrl, setSocketUrl] = useState(process.env.CHAT_URL);
  const [message, setMessage] = useState('');

  const messagesEndRef = useRef(null);
  const [messageHistory, setMessageHistory] = useState([]);

  // const options = useMemo(
  //   () => ({
  //     share: false,
  //     onMessage: messageResponse => console.log(`onMessage`, messageResponse),

  //     onClose: event => console.log('onClose', event),
  //     onError: error => console.log('onError', error),
  //     onOpen: event => console.log('onOpen', event),
  //     fromSocketIO: false,
  //   }),
  //   [],
  // );
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl(process.env.CHAT_URL),
    [],
  );

  // console.log(userData);
  const handleClickSendMessage = useCallback(() => {
    // console.log(message);
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
    // const isSmoothScrollSupported =
    //   'scrollBehavior' in document.documentElement.style;
    // console.log('===isSmoothScrollSupported====');
    // console.log(isSmoothScrollSupported);
    // if (isSmoothScrollSupported) {
    messagesEndRef.current.scrollIntoView({
      inline: 'end',
      block: 'nearest',
      behavior: 'smooth',
    });
    // } else {
    //   messagesEndRef.current.scrollIntoView(false);
    // }

    // messagesEndRef.current.scrollIntoView(true);
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
  }, [messageHistory]);
  // useEffect(() => {
  //   scrollToBottom();
  //   return () => {
  //     // console.log('cleanup2');
  //   };
  // }, [lastMessage]);

  // const connectionStatus = {
  //   [CONNECTION_STATUS_CONNECTING]: 'Connecting',
  //   [CONNECTION_STATUS_OPEN]: 'Open',
  //   [CONNECTION_STATUS_CLOSING]: 'Closing',
  //   [CONNECTION_STATUS_CLOSED]: 'Closed',
  // }[readyState];
  // console.log(userData);
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

TrollBox.propTypes = {
  isSignin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userData: PropTypes.object,
};

// export default TrollBox;
const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});
const withConnect = connect(mapStateToProps);
export default compose(withConnect)(TrollBox);
