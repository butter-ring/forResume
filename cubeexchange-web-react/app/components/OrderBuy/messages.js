/*
 * OrderBuy Messages
 *
 * This contains all the text for the OrderBuy component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OrderBuy';

export default defineMessages({
  available: {
    id: `${scope}.available`,
    defaultMessage: 'Available',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Price',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity',
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Order Amount',
  },
  fees: {
    id: `${scope}.fees`,
    defaultMessage: 'Fees',
  },
  orderBuy: {
    id: `${scope}.orderBuy`,
    defaultMessage: 'BUY',
  },
  orderSell: {
    id: `${scope}.orderSell`,
    defaultMessage: 'SELL',
  },
});
