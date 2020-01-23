/**
 *
 * Asynchronously loads the component for Wallet
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
