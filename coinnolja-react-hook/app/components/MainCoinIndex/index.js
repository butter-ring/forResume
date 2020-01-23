/**
 *
 * MainCoinIndex
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from 'classnames';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CoinIndexTable from 'components/CoinIndexTable';
import Alink from 'components/Alink';
import request from 'utils/request';
import { makeSelectSignin } from 'containers/App/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#f1f1f1',
    },
  },
  tabRoot: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 18,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#979797',
    minWidth: 111,
  },
  tabSelected: {
    // fontFamily: 'NotoSansCJKkr',
    // fontSize: 18,
    // fontStyle: 'normal',
    // fontStretch: 'normal',
    // lineHeight: 'normal',
    // letterSpacing: 0,
    // textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    // maxWidth: 111,
  },
}));

const useStylesm = makeStyles(theme => ({
  buttonWrap: {
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 6,
    paddingTop: 2,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: theme.spacing(0),
    marginRight: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    border: 'solid 1px #ffffff',
    color: '#979797',
    paddingTop: 3,
    fontSize: 12,
    fontWeight: 'bold',
    maxWidth: 43,
    width: '100%',
    height: 30,
    // minWidth: 55,
    paddingLeft: 1,
    paddingRight: 1,
  },
  buttonActive: {
    backgroundColor: '#4d85f1',
    color: '#ffffff',
    border: 'solid 1px #4d85f1',
  },
  setting: {
    color: '#979797',
    display: 'flex',
    alignItems: 'center',
  },
  tableWrap: {
    display: 'flex',
  },
}));

function MainCoinIndex({ isSignin }) {
  const classes = useStyles();
  const classesm = useStylesm();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [tokens, setTokens] = React.useState(false);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    if (isSignin) {
      initData();
    }
  }, [isSignin]);

  console.log(isSignin);
  const initData = async () => {
    if (!isSignin) {
      return false;
    }
    if (!loading) {
      setLoading(true);
      const options = {
        method: 'GET',
        auth: true,
      };
      const result = await request(`/api/membercoinindex/mine`, options);
      console.log(result);
      if (result) {
        const { data } = result;
        if (data) {
          if (data.length > 0) {
            const newTokens = [];
            if (matches) {
              let limit = data.length;
              if (limit > 7) {
                limit = 7;
              }
              for (let i = 0; i < limit; i += 1) {
                newTokens.push(data[i].tokenCode);
              }
            } else {
              for (let i = 0; i < data.length; i += 1) {
                newTokens.push(data[i].tokenCode);
              }
            }

            setTokens(newTokens);
          }
        }
      }

      setLoading(false);
    }
    return true;
  };

  if (isSignin && tokens) {
    return (
      <div className={classes.root}>
        {!matches ? (
          <div className={classesm.tableWrap}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              scrollButtons="auto"
              variant="scrollable"
            >
              {tokens.map(row => (
                <Tab
                  label={row}
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected,
                  }}
                />
              ))}
            </Tabs>
            <div className={classesm.setting}>
              <Alink to="/indexsetting" className={classes.link}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#2b8f28"
                    fillRule="evenodd"
                    d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                  />
                </svg>
              </Alink>
            </div>
          </div>
        ) : (
          <div className={classesm.buttonWrap}>
            {tokens.map((row, idx) => (
              <button
                type="button"
                className={classNames(
                  classesm.button,
                  value === idx && classesm.buttonActive,
                )}
                onClick={() => setValue(idx)}
              >
                {row}
              </button>
            ))}

            <div className={classes.setting}>
              <Alink to="/indexsetting" className={classes.link}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#2b8f28"
                    fillRule="evenodd"
                    d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                  />
                </svg>
              </Alink>
            </div>
          </div>
        )}

        {tokens.map((row, idx) => (
          <div>{value === idx && <CoinIndexTable symbol={row} />}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {!matches ? (
        <div className={classesm.tableWrap}>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab
              label="BTC"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="ETH"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="LTC"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="ETC"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="XRP"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="BCH"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="EOS"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
          </Tabs>
          <div className={classesm.setting}>
            <Alink to="/indexsetting" className={classes.link}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2b8f28"
                  fillRule="evenodd"
                  d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                />
              </svg>
            </Alink>
          </div>
        </div>
      ) : (
        <div className={classesm.buttonWrap}>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 0 && classesm.buttonActive,
            )}
            onClick={() => setValue(0)}
          >
            BTC
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 1 && classesm.buttonActive,
            )}
            onClick={() => setValue(1)}
          >
            ETH
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 2 && classesm.buttonActive,
            )}
            onClick={() => setValue(2)}
          >
            LTC
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 3 && classesm.buttonActive,
            )}
            onClick={() => setValue(3)}
          >
            ETC
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 4 && classesm.buttonActive,
            )}
            onClick={() => setValue(4)}
          >
            XRP
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 5 && classesm.buttonActive,
            )}
            onClick={() => setValue(5)}
          >
            BCH
          </button>
          <button
            type="button"
            className={classNames(
              classesm.button,
              value === 6 && classesm.buttonActive,
            )}
            onClick={() => setValue(6)}
          >
            EOS
          </button>
          <div className={classes.setting}>
            <Alink to="/indexsetting" className={classes.link}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#2b8f28"
                  fillRule="evenodd"
                  d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                />
              </svg>
            </Alink>
          </div>
        </div>
      )}

      {value === 0 && <CoinIndexTable symbol="BTC" />}
      {value === 1 && <CoinIndexTable symbol="ETH" />}
      {value === 2 && <CoinIndexTable symbol="LTC" />}
      {value === 3 && <CoinIndexTable symbol="ETC" />}
      {value === 4 && <CoinIndexTable symbol="XRP" />}
      {value === 5 && <CoinIndexTable symbol="BCH" />}
      {value === 6 && <CoinIndexTable symbol="EOS" />}
    </div>
  );
}

MainCoinIndex.propTypes = {
  isSignin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isSignin: makeSelectSignin(),
});

const withConnect = connect(mapStateToProps);

// export default memo(MainCoinIndex);
export default compose(withConnect)(MainCoinIndex);

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
