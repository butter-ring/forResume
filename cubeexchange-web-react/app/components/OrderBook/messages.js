/*
 * OrderBook Messages
 *
 * This contains all the text for the OrderBook component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OrderBook';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'OrderBook',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Price',
  },
  quantity: {
    id: `${scope}.quantity`,
    defaultMessage: 'Quantity',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
  },
  ask: {
    id: `${scope}.ask`,
    defaultMessage: 'ASK',
  },
  bid: {
    id: `${scope}.bid`,
    defaultMessage: 'BID',
  },
  askAmount: {
    id: `${scope}.askAmount`,
    defaultMessage: 'Total Ask Amount',
  },
  bidAmount: {
    id: `${scope}.bidAmount`,
    defaultMessage: 'Total Bid Amount',
  },
});
