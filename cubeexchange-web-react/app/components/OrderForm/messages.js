/*
 * OrderForm Messages
 *
 * This contains all the text for the OrderForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.OrderForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Order',
  },
  buy: {
    id: `${scope}.buy`,
    defaultMessage: 'Buy',
  },
  sell: {
    id: `${scope}.sell`,
    defaultMessage: 'sell',
  },
});
