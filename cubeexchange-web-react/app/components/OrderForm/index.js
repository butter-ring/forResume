/**
 *
 * OrderForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrderBuy from 'components/OrderBuy';
import OrderSell from 'components/OrderSell';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0),
    // display: 'flex',
    width: '100%',
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
  tabRoot: {
    color: '#e2e3e4;',
    width: '50%',
    height: '4rem',
    lineHeight: '3rem',
    fontSize: '1.3rem',
    borderBottom: '1px solid #4f545f',
    borderTop: '.4rem solid #4f545f',
    fontWeight: 'bold',
  },
  tabRootSelected: {
    borderTop: '.4rem solid #e2e3e4',
    borderBottom: 0,
    fontWeight: 'bold',
  },
  tabRootBuy: {
    borderRight: '1px solid #4f545f',
  },
  indicator: {
    display: 'none',
  },
}));
function OrderForm({ currency, symbol }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <FormattedMessage {...messages.header} />
      </div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="primary"
          centered
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            label={<FormattedMessage {...messages.buy} />}
            classes={{
              root: classNames(classes.tabRoot, classes.tabRootBuy),
              selected: classes.tabRootSelected,
            }}
          />
          <Tab
            label={<FormattedMessage {...messages.sell} />}
            classes={{
              root: classes.tabRoot,
              selected: classes.tabRootSelected,
            }}
          />
        </Tabs>
      </div>
      {value === 0 && <OrderBuy currency={currency} symbol={symbol} />}
      {value === 1 && <OrderSell currency={currency} symbol={symbol} />}
    </div>
  );
}

OrderForm.propTypes = {
  currency: PropTypes.any.isRequired,
  symbol: PropTypes.any.isRequired,
};

export default OrderForm;
