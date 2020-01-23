/**
 *
 * OrderBookPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import request from 'utils/request';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ReactEventSource from 'react-eventsource';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import useWebSocket from 'react-use-websocket';
import { makeSelectSignin, makeSelectUserData } from 'containers/App/selectors';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectOrderBookPage from './selectors';

import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

// const CONNECTION_STATUS_OPEN = 1;

export function OrderBookPage({ isSignin, userData }) {
  useInjectReducer({ key: 'orderBookPage', reducer });
  useInjectSaga({ key: 'orderBookPage', saga });

  const classes = useStyles();

  // const [socketUrl, setSocketUrl] = useState(process.env.CHAT_URL);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderVolume, setOrderVolume] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [orderType, setOrderType] = useState('');
  const [currency, setCurrency] = useState('');
  const [totalPrice, setTotalPrice] = useState(orderPrice * orderVolume);
  // const orderEndRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [orderHistory, setOrderHistory] = useState([]);
  // const eventSource = new ReactEventSource('http://localhost:8080/stream-sse');

  // eventSource.addEventListener('message', event => {
  //   console.log('event check-------------@@');
  //   console.log(event);
  // });

  // useEffect(() => {
  //   if (eventSource !== null) {
  //     setOrderHistory(prev => prev.concat(eventSource));
  //     // scrollToBottom();
  //     console.log('useEffect check-------------------------@@');
  //     console.log(eventSource);
  //   }
  //   return () => {
  //     // console.log('cleanup1');
  //   };
  // }, [eventSource]);

  // eslint-disable-next-line no-unused-vars
  // const [sendOrder, lastOrder, readyState] = useWebSocket(socketUrl);

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl(process.env.API_URL),
  //   [],
  // );

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl(process.env.CHAT_URL),
  //   [],
  // );

  // `{"type":"chat", "price":"${price}", "userId":"${
  //   userData.userId
  // }", "amount":${amount}", "coinName":"${coinName}", "orderPosition":"${orderPosition}", "totalPrice":"${totalPrice}}`,

  // const handleClickSendMessage = useCallback(() => {
  //   if (price && amount && coinName && orderPosition) {
  //     sendOrder(
  //       `{"type":"order", "userId":"${
  //         userData.userId
  //       }", "coinName":"${coinName}", "price":"${price}", "amount":"${amount}", "orderPosition":"${orderPosition}", "totalPrice":${totalPrice}}`,
  //     );
  //   }
  //   console.log('sendOrder check!!!!!!');
  //   console.log(sendOrder);
  //   setPrice(0);
  //   setAmount(0);
  //   setTotalPrice(0);
  //   setCoinName('');
  //   setOrderPosition('');
  // }, [totalPrice !== 0]);

  const GetMessage = () => (
    <ReactEventSource url="http://localhost:8080/stream-sse">
      {events => {
        events.reverse();
        console.log('events check--------------------!!!');
        console.log(events);
        return (
          <div>
            {events.map(e => {
              const data = JSON.parse(e);
              console.log('data check --------------------!!!!');
              console.log(data);
              return <div> {data.symbol}</div>;
            })}
          </div>
        );
      }}
    </ReactEventSource>
  );

  const handleClickSendMessage = async () => {
    const options = {
      method: 'POST',
      data: {
        memberId: userData.userId,
        symbol,
        orderPrice,
        orderVolume,
        orderType,
        currency,
        // totalPrice,
      },
      auth: true,
    };
    try {
      console.log('확인-----------------');
      console.log(options);
      const response = await request(`/api/order`, options);
      console.log('check response------------');
      console.log(response);
      if (response) {
        console.log('주문 성공');
        console.log(response);
      }
    } catch (err) {
      console.log(err);
      alert('주문 에러');
    }
  };

  const handleOrderPrice = event => {
    setOrderPrice(event.target.value);
    // handleTotalPrice();
    // console.log('price check');
    // console.log(event.target.value);
    // console.log(price);
  };

  const handleOrderVolume = event => {
    setOrderVolume(event.target.value);
    // handleTotalPrice();
    // console.log('amount check');
    // console.log(event.target.value);
    // console.log(amount);
    // console.log(price);
  };

  const handleSymbol = event => {
    setSymbol(event.target.value);
  };

  const handleOrderType = event => {
    setOrderType(event.target.value);
  };

  const handleTotalPrice = () => {
    setTotalPrice(orderPrice * orderVolume);
  };

  const handleCurrency = event => {
    setCurrency(event.target.value);
  };

  return (
    <React.Fragment>
      <div>
        <Paper className={classes.root}>
          {/* <div>
            {readyState === CONNECTION_STATUS_OPEN &&
              '주문이 안될경우 새로고침 해주세요'}
          </div> */}
          {/* <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>주문타입</TableCell>
                <TableCell>코인이름</TableCell>
                <TableCell>화폐</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>가격</TableCell>
                <TableCell>총합</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderHistory &&
                orderHistory.map(row => (
                  <TableRow key={JSON.parse(row.data).uuid}>
                    <TableCell>{JSON.parse(row.data).orderType}</TableCell>
                    <TableCell>{JSON.parse(row.data).symbol}</TableCell>
                    <TableCell>{JSON.parse(row.data).currency}</TableCell>
                    <TableCell>{JSON.parse(row.data).orderVolume}</TableCell>
                    <TableCell>{JSON.parse(row.data).orderPrice}</TableCell>
                    <TableCell>{JSON.parse(row.data).totalPrice}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table> */}
          <GetMessage />
          <div>
            {isSignin && (
              <div>
                <div>
                  <InputLabel
                    htmlFor="orderType"
                    className={classes.inputLabel}
                  >
                    주문타입(매도/매수)
                  </InputLabel>
                  <FormControl variant="outlined">
                    <Select
                      value={orderType}
                      onChange={handleOrderType}
                      displayEmpty
                      id="orderType"
                      input={
                        <OutlinedInput
                          name="orderType"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value="">주문타입(지정가/시장가)</MenuItem>
                      <MenuItem value="LIMIT">지정가</MenuItem>
                      <MenuItem value="MARKET">시장가</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <InputLabel htmlFor="currency" className={classes.inputLabel}>
                    화폐
                  </InputLabel>
                  <FormControl variant="outlined">
                    <Select
                      value={currency}
                      onChange={handleCurrency}
                      displayEmpty
                      id="currency"
                      input={
                        <OutlinedInput
                          name="currency"
                          id="outlined-age-simple"
                        />
                      }
                    >
                      <MenuItem value="">화폐</MenuItem>
                      <MenuItem value="KRW">원화</MenuItem>
                      <MenuItem value="ETH">이더리움</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <InputLabel htmlFor="symbol" className={classes.inputLabel}>
                    코인종류
                  </InputLabel>
                  <FormControl variant="outlined">
                    <Select
                      value={symbol}
                      onChange={handleSymbol}
                      displayEmpty
                      id="symbol"
                      input={
                        <OutlinedInput name="symbol" id="outlined-age-simple" />
                      }
                    >
                      <MenuItem value="">코인종류</MenuItem>
                      <MenuItem value="bit">비트코인</MenuItem>
                      <MenuItem value="eth">이더리움</MenuItem>
                      <MenuItem value="xrp">리플코인</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <InputLabel
                    htmlFor="orderVolume"
                    className={classes.inputLabel}
                  >
                    수량
                  </InputLabel>
                  <TextField
                    type="number"
                    // step={1}
                    value={orderVolume}
                    name="orderVolume"
                    onChange={handleOrderVolume}
                    onBlur={handleTotalPrice}
                  />
                </div>

                <div>
                  <InputLabel
                    htmlFor="orderPrice"
                    className={classes.inputLabel}
                  >
                    가격
                  </InputLabel>
                  <TextField
                    type="number"
                    name="orderPrice"
                    value={orderPrice}
                    onChange={handleOrderPrice}
                    onBlur={handleTotalPrice}
                  />
                </div>
                <div>
                  <InputLabel
                    htmlFor="totalPrice"
                    className={classes.inputLabel}
                  >
                    총합
                  </InputLabel>
                  <TextField
                    type="number"
                    name="totalPrice"
                    value={totalPrice}
                    // onChange={handleTotalPrice}
                    readOnly
                  />
                </div>

                {isSignin ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleClickSendMessage}
                    // disabled={readyState !== CONNECTION_STATUS_OPEN}
                  >
                    주문
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    // onClick={handleClickChangeSocketUrl}
                    // disabled={readyState !== CONNECTION_STATUS_OPEN}
                  >
                    연결
                  </Button>
                )}
              </div>
            )}
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}

OrderBookPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  isSignin: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderBookPage: makeSelectOrderBookPage(),
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

export default compose(withConnect)(OrderBookPage);
