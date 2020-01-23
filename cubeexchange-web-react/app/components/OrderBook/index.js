/**
 *
 * OrderBook
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 12,
    paddingTop: theme.spacing(0),
    // display: 'flex',
    width: '100%',
    color: '#e2e3e4;',
    fontSize: '1.3rem',
    border: '1px solid #4f545f',
  },
  header: {
    padding: '0 1.6rem',
    fontSize: '1.4rem',
    color: '#e2e3e4;',
    height: '4.4rem',
    lineHeight: '4.4rem',
    fontWeight: 'bold',
  },
  bookWrap: {
    borderTop: '1px solid #4f545f',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bookHead: {
    display: 'flex',
  },
  bookHeadText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    padding: theme.spacing(1),
  },
  orderSum: {
    display: 'flex',
    backgroundColor: '#242936',
    color: '#6d717a',
    padding: theme.spacing(1),
    fontWeight: 'bold',
    // justifyContent: 'space-between',
  },
  totalAmount: {
    flex: 1,
    textAlign: 'center',
  },
  orderRow: {
    display: 'flex',
  },
  order: {
    textAlign: 'right',
    flex: 1,
    color: '#e2e3e4;',
    paddingRight: '.5rem',
    height: '3.6rem',
    lineHeight: '3.6rem',
    fontSize: '1.4rem',
    borderBottom: '1px solid #242936',
    borderRight: '1px solid #242936',
  },
  askPrice: {
    color: '#f25430;',
    borderLeft: '1px solid #242936',
  },
  bidPrice: {
    color: '#3dcc88',
    borderLeft: '1px solid #242936',
  },
}));
function OrderBook({ orderbook }) {
  const classes = useStyles();
  console.log('orderbook ==[ ', orderbook);

  useEffect(() => {}, [orderbook]);
  const { asks, bids } = orderbook;
  console.log('asks ==[ ', asks);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FormattedMessage {...messages.header} />
      </div>
      <div className={classes.bookWrap}>
        <div className={classes.bookHead}>
          <div className={classes.bookHeadText}>
            <FormattedMessage {...messages.price} />
          </div>
          <div className={classes.bookHeadText}>
            <FormattedMessage {...messages.quantity} />
          </div>
          <div className={classes.bookHeadText}>
            <FormattedMessage {...messages.total} />
          </div>
        </div>

        <div className={classes.orderSum}>
          <FormattedMessage {...messages.ask} />
          <div className={classes.totalAmount}>
            <FormattedMessage {...messages.askAmount} />
          </div>
        </div>
        <div className={classes.askWrap}>
          {asks &&
            asks.length > 0 &&
            asks.map(row => (
              <div className={classes.orderRow}>
                <div className={classNames(classes.order, classes.askPrice)}>
                  {row.orderPrice}
                </div>
                <div className={classNames(classes.order, classes.orderVolume)}>
                  {row.orderVolume}
                </div>
                <div className={classNames(classes.order, classes.totalAmount)}>
                  {row.totalAmount}
                </div>
              </div>
            ))}
        </div>
        <div className={classes.bidWrap}>
          {bids &&
            bids.length > 0 &&
            bids.map(row => (
              <div className={classes.orderRow}>
                <div className={classNames(classes.order, classes.bidPrice)}>
                  {row.orderPrice}
                </div>
                <div className={classNames(classes.order, classes.orderVolume)}>
                  {row.orderVolume}
                </div>
                <div className={classNames(classes.order, classes.totalAmount)}>
                  {row.totalAmount}
                </div>
              </div>
            ))}
        </div>
        <div className={classes.orderSum}>
          <FormattedMessage {...messages.bid} />
          <div className={classes.totalAmount}>
            <FormattedMessage {...messages.bidAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}

OrderBook.propTypes = {
  orderbook: PropTypes.any.isRequired,
};

export default OrderBook;
