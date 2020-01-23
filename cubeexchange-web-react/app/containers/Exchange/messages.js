/*
 * OrderBuy Messages
 *
 * This contains all the text for the OrderBuy component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Exchange';

export default defineMessages({
  orderComplete: {
    id: `${scope}.orderComplete`,
    defaultMessage: 'Order Complete',
  },
  500100: {
    id: `${scope}.500100`,
    defaultMessage: 'Memberid is empty',
  },
  500101: {
    id: `${scope}.500101`,
    defaultMessage: 'Member not found',
  },
  500102: {
    id: `${scope}.500102`,
    defaultMessage: 'Symbol is empty',
  },
  500103: {
    id: `${scope}.500103`,
    defaultMessage: 'Currency is empty',
  },
  500104: {
    id: `${scope}.500104`,
    defaultMessage: 'Order price not acceptable',
  },
  500105: {
    id: `${scope}.500105`,
    defaultMessage: 'Order volume not acceptable',
  },
  500106: {
    id: `${scope}.500106`,
    defaultMessage: 'Commodity not found',
  },
  500107: {
    id: `${scope}.500107`,
    defaultMessage: 'Commodity not available',
  },
  500108: {
    id: `${scope}.500108`,
    defaultMessage: 'Account not found',
  },
  500109: {
    id: `${scope}.500109`,
    defaultMessage: 'Account not available',
  },
  500110: {
    id: `${scope}.500110`,
    defaultMessage: 'Order position not acceptable',
  },
  500111: {
    id: `${scope}.500111`,
    defaultMessage: 'Available balance not enough',
  },
  500112: {
    id: `${scope}.500112`,
    defaultMessage: 'Order status not acceptable',
  },
});
