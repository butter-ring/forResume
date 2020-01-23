/* eslint-disable no-restricted-properties */
/**
 *
 * OrderBuy
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import request from 'utils/request';

import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import { FormattedMessage, FormattedNumber } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    // display: 'flex',
    width: '100%',
    color: '#e2e3e4;',
    fontSize: '1.3rem',
  },
  orderDiv: {
    padding: '1.6rem',
  },
  body: {
    // padding: '1.6rem',
    fontSize: '1.4rem',
  },
  accountBalanceWrap: {
    textAlign: 'right',
  },
  accountBalance: {
    fontSize: '1.8rem',
  },
  inputBox: {
    // padding: 10,
    border: '1px solid #4f545f',
    borderRadius: '.3rem',
    height: '3.6rem',
    backgroundColor: '#101217',
    display: 'flex',
  },
  inputBase: {
    height: '3.6rem',
    width: '100%',
  },
  inputInner: {
    color: '#e2e3e4;',
    fontSize: '1.4rem',
    height: '3.6rem',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'right',
  },
  button: {
    borderLeft: '1px solid #4f545f',
    borderRadius: 0,
    width: '3.6rem',
    minWidth: '3.6rem',
    backgroundColor: '#242936',
    padding: 0,
  },
  title: {
    paddingBottom: 10,
  },
  titleSub: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonVol: {
    border: '1px solid #4f545f',
    backgroundColor: '#242936',
    height: '3rem',
    minWidth: '24%',
    color: '#e2e3e4',
    fontSize: '1.2rem',
    padding: 0,
  },
  buttonOrder: {
    width: '100%',
    backgroundColor: '#4f545f',
    border: '1px solid #4f545f',
    fontSize: '1.4rem',
    color: '#e2e3e4',
    fontWeight: 'bold',
  },
}));
function OrderBuy({ currency, symbol }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [account, setAccount] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [volume, setVolume] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [fees, setFees] = React.useState(0);

  const { availableBalance, takerFeeRate } = account;
  useEffect(() => {
    if (currency) {
      setInitData();
    }
  }, []);

  useEffect(() => {
    if (price) {
      calAmount();
    }
  }, [price, volume]);
  const calAmount = () => {
    const unit = Math.pow(10, 12);
    const accountSlice = Math.round(price * volume * 1e12) / 1e12;

    const accountFloor = Math.floor(accountSlice * unit) / unit;
    console.log('accountFloor ==[', accountFloor);
    const feesGet = accountFloor * (takerFeeRate / 100);
    const feesSet = Math.floor(feesGet * unit) / unit;
    console.log('takerFeeRate ==[', takerFeeRate);
    console.log('feesGet ==[', feesGet);
    console.log('feesSet ==[', feesSet);

    setAmount(accountFloor);
    setFees(feesSet);
    // setVolume(volumeSet);
  };

  const setInitData = async () => {
    if (loading) {
      return false;
    }
    console.log(symbol);
    try {
      setLoading(true);
      const options = {
        method: 'GET',
        auth: true,
      };
      const result = await request(`/api/account/${currency}`, options);
      if (result.data) {
        setAccount(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
    setLoading(false);
    return true;
  };
  const handleOrderSubmit = async () => {
    console.log(loading);
    if (loading) {
      return false;
    }
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        auth: true,
        data: {
          symbol,
          currency,
          orderPrice: price,
          orderVolume: volume,
          orderPosition: 'BUY',
          orderStatus: 'NEW',
        },
      };
      const result = await request(`/api/order`, options);
      if (result.data) {
        setAccount(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setLoading(false);
    }
    // setInitData();
    setLoading(false);
    setInitData();
    return true;
  };
  const handlePrice = e => {
    const priceGet = e.target.value;
    const priceSet = priceGet.match(/[0-9]*\.[0-9]*|[0-9]*/);
    if (priceSet[0]) {
      setPrice(priceSet[0]);
    } else {
      // setPrice(0);
    }
  };
  const handleVolume = e => {
    const volumeGet = e.target.value;
    const volumeSet = volumeGet.match(/[0-9]*\.[0-9]*|[0-9]*/);
    if (volumeSet[0]) {
      setVolume(volumeSet[0]);
    } else {
      // setVolume(0);
    }
  };
  const handlePricePlus = () => {
    const unit = Math.pow(10, 8);
    // const priceGet = price + 0.0001;
    const priceGet = Math.round((price + 0.0001) * 1e12) / 1e12;
    const priceSet = Math.round(priceGet * unit) / unit;
    if (priceSet > 0) {
      setPrice(priceSet);
    }
  };
  const handlePriceMinus = () => {
    const unit = Math.pow(10, 8);
    const priceGet = Math.round((price - 0.0001) * 1e12) / 1e12;
    const priceSet = Math.round(priceGet * unit) / unit;
    if (priceSet > 0) {
      setPrice(priceSet);
    }
  };
  const handleVolumeByRate = rate => {
    if (!availableBalance > 0) {
      return false;
    }
    if (!price > 0) {
      return false;
    }
    const accountSlice = availableBalance * (rate / 100);

    // const priceSlice = price * (rate / 100);
    // console.log(priceSlice);
    // console.log(priceSlice.toFixed(6));
    const count = Math.pow(10, 8);
    const accountFloor = Math.floor(accountSlice * count) / count;
    // console.log('accountFloor ==[', accountFloor);
    const feesGet = accountFloor * (takerFeeRate / 100);
    const feesSet = Math.floor(feesGet * count) / count;
    // console.log('takerFeeRate ==[', takerFeeRate);
    // console.log('feesGet ==[', feesGet);
    // console.log('feesSet ==[', feesSet);

    const volumeGet = (accountFloor - feesSet) / price;
    const volumeSet = Math.floor(volumeGet * count) / count;

    // console.log('volumeGet ==[', volumeGet);
    // console.log('volumeSet ==[', volumeSet);
    setAmount(accountFloor);
    setFees(feesSet);
    setVolume(volumeSet);
    return true;
  };

  return (
    <div className={classes.root}>
      <div className={classes.orderDiv}>
        <div className={classes.title}>
          <FormattedMessage {...messages.available} />
        </div>
        <div className={classNames(classes.body, classes.accountBalanceWrap)}>
          <span className={classes.accountBalance}>
            {availableBalance ? (
              <FormattedNumber
                value={availableBalance}
                minimumFractionDigits={2}
                maximumFractionDigits={8}
              />
            ) : (
              0
            )}
          </span>
          {` `}
          {currency}
        </div>
      </div>
      <div className={classes.orderDiv}>
        <div className={classes.title}>
          <FormattedMessage {...messages.price} />
          {` `}({currency})
        </div>
        <div className={classes.body}>
          <div className={classes.inputBox}>
            <InputBase
              className={classes.inputBase}
              inputProps={{
                maxLength: 20,
              }}
              classes={{
                input: classes.inputInner,
              }}
              value={price}
              onChange={handlePrice}
            />
            <Button className={classes.button} onClick={handlePriceMinus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path fill="#e2e3e4" fillRule="evenodd" d="M19 13H5v-2h14v2z" />
              </svg>
            </Button>
            <Button className={classes.button} onClick={handlePricePlus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#e2e3e4"
                  fillRule="evenodd"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.orderDiv}>
        <div className={classes.title}>
          <FormattedMessage {...messages.quantity} />
        </div>
        <div className={classes.body}>
          <div className={classes.inputBox}>
            <InputBase
              className={classes.inputBase}
              inputProps={{
                maxLength: 20,
              }}
              classes={{
                input: classes.inputInner,
              }}
              value={volume}
              onChange={handleVolume}
            />
          </div>
          <div className={classes.buttonWrap}>
            <Button
              className={classes.buttonVol}
              onClick={() => handleVolumeByRate(10)}
            >
              10%
            </Button>
            <Button
              className={classes.buttonVol}
              onClick={() => handleVolumeByRate(25)}
            >
              25%
            </Button>
            <Button
              className={classes.buttonVol}
              onClick={() => handleVolumeByRate(50)}
            >
              50%
            </Button>
            <Button
              className={classes.buttonVol}
              onClick={() => handleVolumeByRate(100)}
            >
              100%
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.orderDiv}>
        <div className={classNames(classes.title, classes.titleSub)}>
          <FormattedMessage {...messages.amount} />
          <div>
            {/* {amount} */}
            <FormattedNumber
              value={amount}
              minimumFractionDigits={2}
              maximumFractionDigits={16}
            />
            {` `}
            {currency}
          </div>
        </div>
        <div className={classNames(classes.title, classes.titleSub)}>
          <div>
            <FormattedMessage {...messages.fees} /> ({takerFeeRate}%)
          </div>
          <div>
            <FormattedNumber
              value={fees}
              minimumFractionDigits={2}
              maximumFractionDigits={16}
            />
            {/* {fees} */}
            {` `}
            {currency}
          </div>
        </div>
        <div className={classNames(classes.title, classes.titleSub)}>
          <FormattedMessage {...messages.quantity} />
          {` `}
          {volume}
        </div>
      </div>
      <div className={classes.orderDiv}>
        <Button className={classes.buttonOrder} onClick={handleOrderSubmit}>
          <FormattedMessage {...messages.orderBuy} />
        </Button>
      </div>
    </div>
  );
}

OrderBuy.propTypes = {
  currency: PropTypes.any.isRequired,
  symbol: PropTypes.any.isRequired,
};

export default OrderBuy;
