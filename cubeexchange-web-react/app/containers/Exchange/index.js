/**
 *
 * Exchange
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import request from 'utils/request';
import TokenInfo from 'components/TokenInfo';
import TokenList from 'components/TokenList';
import FilledList from 'components/FilledList';
import OrderForm from 'components/OrderForm';
import OrderBook from 'components/OrderBook';
import { EventSourcePolyfill } from 'event-source-polyfill';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { FormattedMessage } from 'react-intl';
import { makeSelectExchange, makeSelectOrderbook } from './selectors';
import { orderbookLoad } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    display: 'flex',
    width: '100%',
    // height: '100%',
    backgroundColor: '#171b23',
  },
  sectionLeft: {
    flex: 1,
    padding: 6,
  },
  sectionCenter: {
    flex: 4,
    padding: 6,
  },
  sectionRight: {
    flex: 2,
    padding: 6,
  },
  redNoti: {
    backgroundColor: theme.palette.error.dark,
    fontSize: 16,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  success: {
    fontSize: 16,
    backgroundColor: green[600],
  },
}));

export function Exchange({ orderbooksLoad, orderbook }) {
  useInjectReducer({ key: 'exchange', reducer });
  useInjectSaga({ key: 'exchange', saga });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(false);
  const [openComplete, setOpenComplete] = React.useState(false);
  const [symbol, setSymbol] = React.useState('CUBE');

  useEffect(() => {
    getConfirmMember();
    getConfirm();
    getFilled();
  }, []);

  useEffect(() => {
    if (symbol) {
      orderbooksLoad(symbol);
    }
  }, [symbol]);
  const getConfirmMember = () => {
    let eventSource = null;
    const options = {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('accessToken'),
      },
    };
    eventSource = new EventSourcePolyfill(
      `${process.env.API_URL}/api/order/confirm/member`,
      options,
    );

    eventSource.addEventListener('open', function(event) {
      console.log(event);
    });
    eventSource.addEventListener('message', function(event) {
      // console.log(event);
      // console.log(event.data);

      const confirm = JSON.parse(event.data);
      // console.log(confirm);
      if (confirm.messageCode) {
        if (confirm.messageCode === 200000) {
          setOpenComplete(true);
        } else {
          setErrorCode(confirm.messageCode);
          setOpen(true);
        }
      }
    });
  };

  const getConfirm = () => {
    let eventSource = null;
    const options = {
      method: 'GET',
      headers: {
        // Authorization: sessionStorage.getItem('accessToken'),
      },
    };
    eventSource = new EventSourcePolyfill(
      `${process.env.API_URL}/api/order/confirm/public`,
      options,
    );

    eventSource.addEventListener('open', function(event) {
      console.log(event);
    });
    eventSource.addEventListener('message', function(event) {
      const confirm = JSON.parse(event.data);
      // console.log(confirm);
      if (confirm.messageCode) {
        if (confirm.messageCode === 200000) {
          // TODO : add order book
          orderbooksLoad(symbol);
        }
      }
    });
  };

  const getFilled = () => {
    let eventSource = null;
    const options = {
      method: 'GET',
    };
    eventSource = new EventSourcePolyfill(
      `${process.env.API_URL}/api/order/filled/public`,
      options,
    );

    eventSource.addEventListener('open', function(event) {
      console.log(event);
    });
    eventSource.addEventListener('message', function(event) {
      const filled = JSON.parse(event.data);
      console.log(filled);
      // if (confirm.messageCode) {
      // TODO : add order book
      orderbooksLoad(symbol);
      // }
    });
  };

  function handleClose() {
    setOpen(false);
  }
  function handleCloseComplate() {
    setOpenComplete(false);
  }
  const handleSymbol = symbolSel => {
    setSymbol(symbolSel);
  };
  return (
    <div className={classes.root}>
      <div className={classNames(classes.section, classes.sectionLeft)}>
        <TokenInfo />
        <TokenList handleSymbol={handleSymbol} />
      </div>
      <div className={classNames(classes.section, classes.sectionCenter)}>
        <TradingViewWidget
          symbol="BITFINEX:BTCUSD"
          theme={Themes.DARK}
          locale="kr"
          width="100%"
          height="450"
          interval="240"
          timezone="Asia/Seoul"
          hideSideToolbar="false"
          allowSymbolChange="true"
          studies="BollingerBandsR"
          // autosize
        />
        {orderbook && <OrderBook orderbook={orderbook} />}
      </div>
      <div className={classNames(classes.section, classes.sectionRight)}>
        <FilledList />
        <OrderForm currency="ETH" symbol="CUBE" />
      </div>
      <Snackbar
        // className={classes.redNoti}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent
          className={classes.redNoti}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={classes.iconVariant} />
              {errorCode && <FormattedMessage {...messages[errorCode]} />}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          // {...other}
        />
      </Snackbar>
      <Snackbar
        // className={classes.redNoti}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // key={`${vertical},${horizontal}`}
        open={openComplete}
        onClose={handleCloseComplate}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent
          className={classes.success}
          aria-describedby="client-snackbar-com"
          message={
            <span id="client-snackbar-com" className={classes.message}>
              <CheckCircleIcon className={classes.iconVariant} />
              <FormattedMessage {...messages.orderComplete} />
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={handleCloseComplate}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
}

Exchange.propTypes = {
  orderbooksLoad: PropTypes.func.isRequired,
  orderbook: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  exchange: makeSelectExchange(),
  orderbook: makeSelectOrderbook(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    orderbooksLoad: symbol => {
      dispatch(orderbookLoad(symbol));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Exchange);
